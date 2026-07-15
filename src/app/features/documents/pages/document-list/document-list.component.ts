import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Router, RouterModule } from '@angular/router';

import { DocumentService } from '../../services/document.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { SearchToolbarComponent } from '../../../../shared/components/search-toolbar/search-toolbar.component';
@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    PageHeaderComponent,
    SearchToolbarComponent
],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<any>([]);

displayedColumns = [
  'file',
  'title',
  'category',
  'size',
  'publishDate',
  'actions'
];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
document1: any;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDocuments(): void {

    this.documentService.getAll().subscribe({

      next: (response) => {

        this.dataSource.data = response.data ?? response;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },

      error: (err) => console.error(err)

    });

  }

  applyFilter(event: Event): void {

    const value =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      value.trim().toLowerCase();

  }

  edit(document: any): void {

    this.router.navigate([
      '/documents/edit',
      document.documentId
    ]);

  }

  delete(document: any): void {

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Delete Document',
          message: `Delete "${document.title}" ?`
        }
      });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.documentService
        .delete(document.documentId)
        .subscribe({

          next: () => {

            this.loadDocuments();

            this.snackbar.success(
              'Document deleted successfully');

          },

          error: () => {

            this.snackbar.error(
              'Unable to delete document');

          }

        });

    });

  }

  // view(document: any): void {

  //   window.open(
  //     `https://drive.google.com/file/d/${document.googleDriveFileId}/view`,
  //     '_blank'
  //   );

  // }
  view(document: any): void {

  window.open(document.viewUrl, '_blank');

}
download(doc: any): void {

  this.documentService.download(doc.documentId)
    .subscribe({

      next: (blob) => {

        const url = window.URL.createObjectURL(blob);

        const a = window.document.createElement('a');

        a.href = url;
        a.download = doc.fileName;

        a.click();

        window.URL.revokeObjectURL(url);

      },

      error: () => {

        this.snackbar.error('Unable to download document.');

      }

    });

}
formatFileSize(bytes: number): string {

  if (!bytes || bytes === 0) {
    return '0 KB';
  }

  const kb = 1024;
  const mb = kb * 1024;

  if (bytes >= mb) {
    return (bytes / mb).toFixed(2) + ' MB';
  }

  return (bytes / kb).toFixed(0) + ' KB';
}
getFileIcon(extension: string): string {

  switch ((extension || '').toLowerCase()) {

    case '.pdf':
      return 'picture_as_pdf';

    case '.doc':
    case '.docx':
      return 'description';

    case '.xls':
    case '.xlsx':
      return 'table_chart';

    case '.jpg':
    case '.jpeg':
    case '.png':
      return 'image';

    default:
      return 'insert_drive_file';
  }
}

getFileIconClass(extension: string): string {

  switch ((extension || '').toLowerCase()) {

    case '.pdf':
      return 'pdf-icon';

    case '.doc':
    case '.docx':
      return 'word-icon';

    case '.xls':
    case '.xlsx':
      return 'excel-icon';

    case '.jpg':
    case '.jpeg':
    case '.png':
      return 'image-icon';

    default:
      return 'file-icon';
  }
}
getFileBadgeText(extension: string): string {

  switch ((extension || '').toLowerCase()) {

    case '.pdf':
      return 'PDF';

    case '.doc':
    case '.docx':
      return 'DOC';

    case '.xls':
    case '.xlsx':
      return 'XLS';

    case '.jpg':
    case '.jpeg':
    case '.png':
      return 'IMG';

    case '.zip':
      return 'ZIP';

    case '.txt':
      return 'TXT';

    default:
      return 'FILE';
  }
}

getFileBadgeClass(extension: string): string {

  switch ((extension || '').toLowerCase()) {

    case '.pdf':
      return 'pdf';

    case '.doc':
    case '.docx':
      return 'word';

    case '.xls':
    case '.xlsx':
      return 'excel';

    case '.jpg':
    case '.jpeg':
    case '.png':
      return 'image';

    default:
      return 'file';
  }
}
}