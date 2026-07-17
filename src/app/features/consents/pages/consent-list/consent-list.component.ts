import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule
} from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { RouterLink } from '@angular/router';

import { ConsentService } from '../../services/consent.service';
import { Consent } from '../../models/consent.model';

import { SnackbarService } from '../../../../core/services/snackbar.service';


import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';


import { SearchToolbarComponent }
from '../../../../shared/components/search-toolbar/search-toolbar.component';

import { ConfirmDialogComponent }
from '../../../../shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-consent-list',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    RouterLink,
    PageHeaderComponent,
    SearchToolbarComponent
  ],

  templateUrl: './consent-list.component.html',
  styleUrl: './consent-list.component.scss'
})
export class ConsentListComponent 
implements OnInit, AfterViewInit {


  private consentService = inject(ConsentService);
  private snackbar = inject(SnackbarService);
  private dialog = inject(MatDialog);


  displayedColumns = [
    'flatNumber',
    'memberName',
    'consentStatus',
    'consentDate',
    'actions'
  ];


  dataSource = new MatTableDataSource<Consent>();


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  ngOnInit(): void {

    this.loadConsents();

  }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

  }


  loadConsents(): void {

    this.consentService.getAll()
    .subscribe({

      next:(response)=>{

        this.dataSource.data = response.data ?? [];

      },

      error:(err)=>{

        console.error(err);

        this.snackbar.error(
          'Unable to load consents.'
        );

      }

    });

  }


  applyFilter(event: Event){

    const value =
    (event.target as HTMLInputElement).value;
    
if (this.dataSource.paginator) {
  this.dataSource.paginator.firstPage();
}

  }


  getStatusText(status:number){

    switch(status){

      case 1:
        return 'Yes';

      case 2:
        return 'No';

      default:
        return 'Pending';

    }

  }


  deleteConsent(row:Consent){

    const dialogRef =
    this.dialog.open(
      ConfirmDialogComponent,
      {
        width:'400px',
        data:{
          title:'Delete Consent',
          message:
          `Delete consent for ${row.memberName}?`
        }
      }
    );


    dialogRef.afterClosed()
    .subscribe(result=>{

      if(!result)
        return;


      this.consentService
      .delete(row.consentId)
      .subscribe({

        next:(response)=>{

          if(response.success){

            this.snackbar.success(
              response.message
            );

            this.loadConsents();

          }

        },

        error:()=>{

          this.snackbar.error(
            'Unable to delete consent.'
          );

        }

      });

    });

  }

}