import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { console.log('Dashboard Loaded');}

  ngOnInit(): void {

    this.http.get('http://localhost:5278/api/Members')
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.log('Error:', error);
        }
      });

  }

}