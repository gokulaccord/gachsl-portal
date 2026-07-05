import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SocietySettingsService } from '../../services/society-settings.service';
import { SocietySettings } from '../../models/society-settings.model';

@Component({
  selector: 'app-society-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './society-settings.component.html',
  styleUrl: './society-settings.component.scss'
})
export class SocietySettingsComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingsService: SocietySettingsService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      societyName: ['', Validators.required],
      societyShortName: [''],

      totalFlats: [0],
      totalShops: [0],

      currentStage: [1],
      totalStages: [8],

      pmcName: [''],
      developerName: [''],

      registrationNumber: [''],
      address: [''],

      email: [''],
      phone: [''],

      logoUrl: ['']
    });

    this.loadSettings();
  }

  loadSettings(): void {

    this.settingsService.get().subscribe({
      next: (response) => {

        if (response.success && response.data) {
          this.form.patchValue(response.data);
        }

      },
      error: (err) => console.error(err)
    });

  }

  save(): void {

    if (this.form.invalid)
      return;

    const data = this.form.value as SocietySettings;

    this.settingsService.update(data).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (err) => console.error(err)
    });

  }

}