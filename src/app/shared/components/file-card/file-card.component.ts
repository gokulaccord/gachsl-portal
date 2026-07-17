import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {

  @Input() fileName!: string;

  @Input() fileSize = 0;

  @Input() fileExtension = '';

  @Input() uploadedDate?: Date;

  @Input() showView = true;

  @Input() showDownload = true;

  @Input() showDelete = false;

  @Output() view = new EventEmitter<void>();

  @Output() download = new EventEmitter<void>();

  @Output() delete = new EventEmitter<void>();


 getFileIcon(): string {

  const ext = (this.fileExtension || '').toLowerCase();

  if (ext.endsWith('.pdf') || ext === 'pdf')
    return 'picture_as_pdf';

  if (ext.endsWith('.doc') || ext.endsWith('.docx') || ext === 'doc' || ext === 'docx')
    return 'description';

  if (ext.endsWith('.xls') || ext.endsWith('.xlsx') || ext === 'xls' || ext === 'xlsx')
    return 'table_chart';

  if (ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png'))
    return 'image';

  if (ext.endsWith('.zip'))
    return 'folder_zip';

  return 'insert_drive_file';
}

  getFileSize(): string {

    if (this.fileSize < 1024)
      return this.fileSize + ' Bytes';

    if (this.fileSize < 1024 * 1024)
      return (this.fileSize / 1024).toFixed(2) + ' KB';

    if (this.fileSize < 1024 * 1024 * 1024)
      return (this.fileSize / (1024 * 1024)).toFixed(2) + ' MB';

    return (this.fileSize / (1024 * 1024 * 1024)).toFixed(2) + ' GB';

  }

}