import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { RouterModule, Router } from '@angular/router';

import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../models/notice';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-notice-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './notice-list.component.html',
  styleUrl: './notice-list.component.scss'
})
export class NoticeListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'title',
    'publishDate',
    'category',
    'priority',
    'isPublished',
    'actions'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private noticeService: NoticeService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // loadNotices(): void {

  //   this.noticeService.getAll().subscribe({

  //     next: (response) => {

  //       console.log('Full Response:', response);
  //       console.log('Data:', response.data);

  //       if (response.data && response.data.length > 0) {
  //         console.log('First Notice Object:', response.data[0]);
  //       }

  //       this.dataSource.data = response.data ?? response;

  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //     },

  //     error: (err) => {
  //       console.error(err);
  //     }

  //   });

  // }
loadNotices(): void {

  this.noticeService.getAll().subscribe({

    next: (response) => {

      console.log(JSON.stringify(response, null, 2));

      this.dataSource.data = response.data ?? response;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },

    error: (err) => {
      console.error(err);
    }

  });

}
  applyFilter(event: Event): void {

    const value = (event.target as HTMLInputElement).value;

    this.dataSource.filter = value.trim().toLowerCase();

  }

  edit(notice: any): void {

    console.log('Notice object:', notice);
    console.log('notice.id:', notice.id);
    console.log('notice.noticeId:', notice.noticeId);

    this.router.navigate([
      '/notices/edit',
      notice.noticeId
    ]);

  }

  delete(notice: any): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {

      width: '400px',

      data: {
        title: 'Delete Notice',
        message: `Are you sure you want to delete "${notice.title}"?`
      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.noticeService.delete(notice.noticeId).subscribe({

        next: () => {

          this.loadNotices();
          this.snackbar.success('Notice deleted successfully');

        },

        error: () => {

          this.snackbar.error('Unable to delete notice.');

        }

      });

    });

  }

}