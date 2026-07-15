import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DocumentService } from '../../services/document.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.scss'
})
export class DocumentFormComponent implements OnInit {

  form!: FormGroup;

  categories: any[] = [];

  selectedFile!: File;

  isEdit = false;

  documentId = 0;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({

      title: ['', Validators.required],

      description: [''],

      categoryId: [null, Validators.required],

      publishDate: [new Date(), Validators.required],

      displayOrder: [0]

    });

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.documentId = Number(id);

      this.loadDocument();

    }

  }

  loadCategories(): void {

    this.documentService.getCategories().subscribe({

      next: (data) => {

        this.categories = data;

      },

      error: console.error

    });

  }

  loadDocument(): void {

    this.documentService.getById(this.documentId)
      .subscribe({

        next: (response) => {

          const d = response.data;

          this.form.patchValue({

            title: d.title,

            description: d.description,

            categoryId: d.categoryId,

            publishDate: d.publishDate,

            displayOrder: d.displayOrder

          });

        }

      });

  }

  onFileSelected(event: any): void {

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

    }

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    if (!this.isEdit && !this.selectedFile) {

      this.snackbar.error('Please select a file.');

      return;

    }

    if (this.isEdit) {

      this.documentService.update(
        this.documentId,
        this.form.value
      ).subscribe({

        next: () => {

          this.snackbar.success('Document updated.');

          this.router.navigate(['/documents']);

        }

      });

      return;

    }

    const formData = new FormData();

    formData.append('Title', this.form.value.title);

    formData.append('Description',
      this.form.value.description ?? '');

    formData.append('CategoryId',
      this.form.value.categoryId);

    formData.append('PublishDate',
      this.form.value.publishDate.toISOString());

    formData.append('DisplayOrder',
      this.form.value.displayOrder);

    formData.append('File', this.selectedFile);

    this.documentService.create(formData)
      .subscribe({

        next: () => {

          this.snackbar.success('Document uploaded successfully.');

          this.router.navigate(['/documents']);

        },

        error: (err) => {

          console.error(err);

          this.snackbar.error('Upload failed.');

        }

      });

  }

}