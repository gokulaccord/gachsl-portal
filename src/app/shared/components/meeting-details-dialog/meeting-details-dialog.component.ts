import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { MeetingDocumentService } from '../../../core/services/meeting-document.service';
import {
MAT_DIALOG_DATA,
MatDialogModule,
MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FileCardComponent } from '../../../shared/components/file-card/file-card.component';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-meeting-details-dialog',
  standalone: true,
  imports: [
  CommonModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  FileCardComponent,
  MatTabsModule
  ],
  templateUrl: './meeting-details-dialog.component.html',
  styleUrls: ['./meeting-details-dialog.component.scss']
})
export class MeetingDetailsDialogComponent implements OnInit{
documents: any[] = [];

loadingDocuments = false;
  constructor(
    private dialogRef: MatDialogRef<MeetingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public meeting:any, private meetingDocumentService: MeetingDocumentService,private snackBar: MatSnackBar, private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadDocuments();

  }

  close(): void{
    this.dialogRef.close();
  }
loadDocuments(): void {

    this.loadingDocuments = true;

    this.meetingDocumentService
        .getByMeeting(this.meeting.meetingId)
        .subscribe({

            next: (response) => {

                this.documents = response.data ?? [];

                this.loadingDocuments = false;

            },

            error: () => {

                this.loadingDocuments = false;

            }

        });

}
onFileSelected(event:any): void {

    if (!event.target.files.length)
        return;

    const file = event.target.files[0];

    const formData = new FormData();

    formData.append(
        'meetingId',
        this.meeting.meetingId);

    formData.append(
        'file',
        file);

    formData.append(
        'description',
        '');

    formData.append(
        'displayOrder',
        '1');

    this.meetingDocumentService
        .upload(formData)
        .subscribe({

            next: () => {

                this.snackBar.open(
                    'Attachment uploaded successfully',
                    'Close',
                    {
                        duration:3000
                    });

                this.loadDocuments();

            },

            error: () => {

                this.snackBar.open(
                    'Upload failed',
                    'Close',
                    {
                        duration:3000
                    });

            }

        });

}
deleteDocument(id: number, fileName: string): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '420px',
        disableClose: true,
        data: {
            title: 'Delete Attachment',
            message: 'Are you sure you want to delete this attachment?',
            itemName: fileName
        }
    });

    dialogRef.afterClosed().subscribe(result => {

        if (!result)
            return;

        this.meetingDocumentService
            .delete(id)
            .subscribe({

                next: () => {

                    this.snackBar.open(
                        'Attachment deleted successfully',
                        'Close',
                        {
                            duration: 3000
                        });

                    this.loadDocuments();

                },

                error: () => {

                    this.snackBar.open(
                        'Delete failed',
                        'Close',
                        {
                            duration: 3000
                        });

                }

            });

    });

}
openView(doc: any): void {

    window.open(doc.viewUrl, '_blank');

}

openDownload(doc: any): void {

    window.open(doc.downloadUrl, '_blank');

}
}