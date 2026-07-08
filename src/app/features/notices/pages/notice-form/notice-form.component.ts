import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NoticeService } from '../../services/notice.service';


@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './notice-form.component.html',
  styleUrl: './notice-form.component.scss'
})
export class NoticeFormComponent implements OnInit {


  noticeForm: FormGroup;


  isEditMode = false;

  noticeId!: number;



  categories = [
    'General',
    'Meeting',
    'Maintenance',
    'Emergency'
  ];


  priorities = [
    'High',
    'Medium',
    'Low'
  ];



  constructor(

    private fb: FormBuilder,

    private noticeService: NoticeService,

    private router: Router,

    private route: ActivatedRoute

  ) {


    this.noticeForm = this.fb.group({


      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ],


      description: [
        '',
        Validators.required
      ],


      publishDate: [
        new Date(),
        Validators.required
      ],


      category: [
        'General'
      ],


      priority: [
        'Medium'
      ],


      attachmentUrl: [
        ''
      ],


      isPublished: [
        true
      ],


      isActive: [
        true
      ]


    });


  }




  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');


    if (id) {

      this.isEditMode = true;

      this.noticeId = Number(id);

      this.loadNotice();

    }


  }





  loadNotice(): void {


    this.noticeService.getById(this.noticeId)

      .subscribe({

        next: (response) => {


          const notice = response.data ?? response;


          this.noticeForm.patchValue({


            title: notice.title,


            description: notice.description,


            publishDate: new Date(notice.publishDate),


            category: notice.category,


            priority: notice.priority,


            attachmentUrl: notice.attachmentUrl,


            isPublished: notice.isPublished,


            isActive: notice.isActive


          });


        },


        error: (err) => {

          console.error(err);

        }


      });


  }





  save(): void {


    if (this.noticeForm.invalid) {


      this.noticeForm.markAllAsTouched();

      return;

    }



    if (this.isEditMode) {


      this.noticeService.update(
        this.noticeId,
        this.noticeForm.value
      )

      .subscribe({

        next: () => {

          this.router.navigate(['/notices']);

        },


        error: (err) => {

          console.error(err);

        }


      });


    }

    else {


      this.noticeService.create(
        this.noticeForm.value
      )

      .subscribe({

        next: () => {

          this.router.navigate(['/notices']);

        },


        error: (err) => {

          console.error(err);

        }


      });


    }


  }





  cancel(): void {


    this.router.navigate(['/notices']);


  }
edit(notice: any): void {

  console.log('Notice Object:', notice);

  alert(JSON.stringify(notice));

}

}