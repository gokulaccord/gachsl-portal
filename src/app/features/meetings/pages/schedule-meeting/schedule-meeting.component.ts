import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import{MeetingService} from '../../services/meeting.service';
import{CreateMeeting} from '../../models/create-meeting.model';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  PageHeaderComponent
],
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss']
})
export class ScheduleMeetingComponent {

  meetingForm: FormGroup;
isEditMode = false;
meetingId = 0;
  meetingTypes = [
    'Managing Committee',
    'General Body',
    'Redevelopment Committee',
    'Emergency Meeting'
  ];

  statuses = [
    'Scheduled',
    'Draft',
    'Cancelled'
  ];

  constructor(
  private fb: FormBuilder,
  private router: Router,
  private route: ActivatedRoute,
  private meetingService: MeetingService,
  private snackbar: SnackbarService
) {

  this.meetingForm = this.fb.group({
    meetingTitle: ['', Validators.required],
    meetingType: ['', Validators.required],
    meetingDate: ['', Validators.required],
    meetingTime: ['', Validators.required],
    minutes: [''],       
    venue: ['', Validators.required],
    description: [''],
    status: ['Scheduled', Validators.required]
  });

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.isEditMode = true;
    this.meetingId = Number(id);
    this.loadMeeting();
  }
}
loadMeeting(): void {

  this.meetingService.getById(this.meetingId).subscribe({

    next: (response) => {

      if (!response.success || !response.data) {
        return;
      }

      this.meetingForm.patchValue(response.data);

    },

    error: (err) => {
      console.error(err);
    }

  });

}
 save(): void {
console.log('Save clicked');
console.log('Saving:', this.meetingForm.value);
  if (this.meetingForm.invalid) {
    this.meetingForm.markAllAsTouched();
    return;
  }

  if (this.isEditMode) {

    this.meetingService.update(this.meetingId, this.meetingForm.value).subscribe({

      next: (response) => {

        this.snackbar.success(response.message);

        this.router.navigate(['/meetings']);

      },

      error: () => {

        this.snackbar.error('Unable to update meeting.');

      }

    });

  } else {

    this.meetingService.create(this.meetingForm.value).subscribe({

      next: (response) => {

        this.snackbar.success(response.message);

        this.router.navigate(['/meetings']);

      },

      error: () => {

        this.snackbar.error('Unable to schedule meeting.');

      }

    });

  }

}


  cancel(): void {
    this.router.navigate(['/meetings']);
  }

}