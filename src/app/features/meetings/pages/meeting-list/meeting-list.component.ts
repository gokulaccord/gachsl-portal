import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";

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
    PageHeaderComponent
],
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.scss'
})
export class MeetingListComponent implements OnInit {

  private meetingService = inject(MeetingService);

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

  loadMeetings(): void {

    this.loading = true;

    this.meetingService.getAll().subscribe({

      next: (response) => {

        this.dataSource.data = response.data ?? [];

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.loading = false;

      },

      error: (err) => {
        console.error(err);
        this.loading = false;
      }

    });

  }

  applyFilter(event: Event): void {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

}