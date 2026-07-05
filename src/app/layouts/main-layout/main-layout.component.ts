import { Component  } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoaderService } from '../../core/services/loader.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    MatIconModule  
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit  {
isCollapsed = false;
isLoading$!: Observable<boolean>;
constructor(private loaderService: LoaderService) {}

ngOnInit(): void {
  this.isLoading$ = this.loaderService.isLoading$;
}
toggleSidebar(): void {
  this.isCollapsed = !this.isCollapsed;
}
}