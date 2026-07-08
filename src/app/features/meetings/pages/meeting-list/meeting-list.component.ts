import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MeetingService } from '../../services/meeting.service';
import { Meeting } from '../../models/meeting.model';

import { SnackbarService } from '../../../../core/services/snackbar.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
    MatDialogModule,
        RouterLink
],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss'
})
export class MeetingListComponent implements OnInit, AfterViewInit {
private dialog = inject(MatDialog);
  private meetingService = inject(MeetingService);
  private snackbar = inject(SnackbarService);

  displayedColumns: string[] = [
    'meetingDate',
    'meetingTitle',
    'venue',
    'meetingType',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Meeting>();

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadMeetings();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMeetings(): void {

    this.loading = true;

    this.meetingService.getAll().subscribe({

      next: (response) => {

        this.dataSource.data = response.data ?? [];

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.snackbar.error('Unable to load meetings.');

        this.loading = false;

      }

    });

  }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
deleteMeeting(meeting: Meeting): void {

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Delete Meeting',
      message: `Are you sure you want to delete "${meeting.meetingTitle}"?`
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {
      return;
    }

    this.meetingService.delete(meeting.meetingId).subscribe({

      next: (response) => {

        if (response.success) {

          this.snackbar.success(response.message);

          this.loadMeetings();

        } else {

          this.snackbar.error(response.message);

        }

      },

     error: (err) => {

  console.error(err);

  this.snackbar.error(err.error?.message || 'Unable to delete meeting.');

}

    });

  });

}
}