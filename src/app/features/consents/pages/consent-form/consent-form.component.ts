import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

import { ConsentService } from '../../services/consent.service';
import { MemberService } from '../../../members/services/member.service';
import { Member } from '../../../members/models/member.model';

import { SnackbarService } from '../../../../core/services/snackbar.service';
import { UpdateConsent } from '../../models/update-consent.model';
import { CreateConsent } from '../../models/create-consent.model';
import { MemberLookup } from '../../../../core/models/member-lookup.model';
import { DocumentService } from '../../../documents/services/document.service';
import { DocumentLookup } from '../../../../core/models/document-lookup.model';
@Component({
  selector: 'app-consent-form',
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
  templateUrl: './consent-form.component.html',
  styleUrl: './consent-form.component.scss'
})
export class ConsentFormComponent implements OnInit {

  consentForm: FormGroup;

  members: MemberLookup[] = [];
documents: DocumentLookup[] = [];
  isEditMode = false;

  consentId = 0;

  consentStatuses = [
    { id: 0, name: 'Pending' },
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consentService: ConsentService,
    private memberService: MemberService,
    private snackbar: SnackbarService,
    private documentService: DocumentService,
  ) {

    this.consentForm = this.fb.group({
      memberId: ['', Validators.required],
      consentStatus: [0, Validators.required],
        consentDate: [new Date()],
      remarks: [''],
      documentId: [null]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.consentId = Number(id);
    }
  }

  ngOnInit(): void {

    this.loadMembers();

    this.loadDocuments();

    if (this.isEditMode) {
        this.loadConsent();
    }

}

loadMembers(): void {

  this.memberService
      .getAvailableMembers(this.isEditMode ? this.consentId : undefined)
      .subscribe({

        next: (response) => {
          this.members = response;
        },

        error: () => {
          this.snackbar.error('Unable to load members.');
        }

      });

}

save(): void {

  if (this.consentForm.invalid) {

    this.consentForm.markAllAsTouched();

    return;

  }

  if (this.isEditMode) {

    const updateData: UpdateConsent = {

      consentStatus: this.consentForm.value.consentStatus,

      consentDate: this.consentForm.value.consentDate,

      remarks: this.consentForm.value.remarks,

      documentId: this.consentForm.value.documentId,

      isActive: true

    };

    this.consentService.update(this.consentId, updateData).subscribe({

      next: (response) => {

        this.snackbar.success(response.message);

        this.router.navigate(['/consents']);

      },

      error: (err) => {

        console.error(err);

        this.snackbar.error(err.error?.message || 'Unable to update consent.');

      }

    });

  }
  else {

    const createData: CreateConsent = {

      memberId: this.consentForm.value.memberId,

      consentStatus: this.consentForm.value.consentStatus,

      consentDate: this.consentForm.value.consentDate,

      remarks: this.consentForm.value.remarks,

      documentId: this.consentForm.value.documentId

    };

    this.consentService.create(createData).subscribe({

      next: (response) => {

        this.snackbar.success(response.message);

        this.router.navigate(['/consents']);

      },

      error: (err) => {

        console.error(err);

        this.snackbar.error(err.error?.message || 'Unable to save consent.');

      }

    });

  }

}

  cancel(): void {

    this.router.navigate(['/consents']);

  }
loadConsent(): void {

  this.consentService.getById(this.consentId).subscribe({

    next: (response) => {

      if (!response.success || !response.data) {
        return;
      }

      this.consentForm.patchValue({

        memberId: response.data.memberId,

        consentStatus: response.data.consentStatus,

        consentDate: response.data.consentDate,

        remarks: response.data.remarks,

        documentId: response.data.documentId

      });

      // Member cannot be changed after creation
      this.consentForm.get('memberId')?.disable();

    },

    error: (err) => {

      console.error(err);

      this.snackbar.error('Unable to load consent.');

    }

  });

}
loadDocuments(): void {

  this.documentService.getLookup().subscribe({

    next: (response) => {

     

    },

    error: (err) => {

      console.error(err);

      this.snackbar.error('Unable to load documents.');

    }

  });

}
}