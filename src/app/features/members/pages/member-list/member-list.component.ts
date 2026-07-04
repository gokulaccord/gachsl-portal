import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
   CommonModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatTooltipModule,
  MatDialogModule
  ],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
members: Member[] = [];

displayedColumns: string[] = [
  'flatNumber',
  'fullName',
  'phone',
  'email',
  'isOwner',
  'isActive',
  'actions'
];

dataSource = new MatTableDataSource<Member>();
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(private memberService: MemberService, private dialog: MatDialog, private snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    this.memberService.getAll().subscribe({
next: (response) => {

  this.dataSource.data = response.data;

  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

},
//       next: (response) => {

//         console.log(response);

//         this.members = response.data;
// this.dataSource.data = response.data;

//       },

      error: (err) => {

        console.error(err);

      }

    });

  }


applyFilter(event: Event): void {

  const value = (event.target as HTMLInputElement).value;

  this.dataSource.filter = value.trim().toLowerCase();

}
addMember(): void {

  const dialogRef = this.dialog.open(MemberFormComponent, {
    width: '550px'
  });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {
      return;
    }

    this.memberService.create(result).subscribe({

      next: (response) => {

        console.log('Member created successfully', response);

        // Refresh the grid
        this.loadMembers();
  this.snackbar.success('Member added successfully');
      },


      error: (error) => {

        console.error('Error creating member', error);

      }

    });

  });

}
editMember(member: any): void {

  const dialogRef = this.dialog.open(MemberFormComponent, {
    width: '550px',
    data: member   
  });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    this.memberService.update(member.memberId, result).subscribe({

      next: (res) => {

        console.log('Updated:', res);
        this.loadMembers();
  this.snackbar.success('Member Details updated successfully');
      },

      error: (err) => {
        console.error(err);
      }

    });

  });

}
deleteMember(member: any): void {


const dialogRef = this.dialog.open(ConfirmDialogComponent, {

  width: '400px',

  data: {

    title: 'Delete Member',

    message: `Are you sure you want to delete "${member.fullName}"?`

  }

});
dialogRef.afterClosed().subscribe(result => {

  if (!result) {
    return;
  }

  this.memberService.delete(member.memberId).subscribe({

    next: () => {

           const input = document.querySelector('input[matInput]') as HTMLInputElement;
      if (input) {
        input.value = '';
      }


      this.loadMembers();

      this.snackbar.success('Member deleted successfully');

    },

    error: () => {

      this.snackbar.error('Unable to delete member.');

    }

  });

});

  // const confirmDelete = confirm(
  //   `Are you sure you want to delete ${member.fullName}?`
  // );

 // if (!confirmDelete) return;

  // this.memberService.delete(member.memberId).subscribe({

  //   next: () => {

  //      const input = document.querySelector('input[matInput]') as HTMLInputElement;
  //     if (input) {
  //       input.value = '';
  //     }

  //     // If you're using Angular Material table filter
  //     this.dataSource.filter = '';

  //     // Reload full data
  //     this.loadMembers();
  //       this.snackbar.success('Member Deleted successfully');

  //   },

  //   error: (err) => {
  //     console.error(err);
  //   }

  // });

}
}