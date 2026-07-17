import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from './services/dashboard.service';
import { DashboardSummary } from './models/dashboard-summary.model';

import { SnackbarService } from '../../core/services/snackbar.service';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  summary!: DashboardSummary;
public pieChartType: 'pie' = 'pie';

public pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: ['Yes', 'No', 'Pending'],
  datasets: [
    {
      data: [0, 0, 0]
    }
  ]
};
public barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: ['Flats', 'Shops', 'Members'],
  datasets: [
    {
      data: [0, 0, 0],
      label: 'GACHSL Status'
    }
  ]
};

public barChartOptions = {
  responsive: true
};

public barChartType = 'bar' as const;
public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
  constructor(
    private dashboardService: DashboardService,
    private snackbar: SnackbarService
  ) { }

 ngOnInit(): void {

console.log(this.pieChartData);
  this.dashboardService.getSummary()
    .subscribe({

 next: (response) => {

  this.summary = response.data;


  // Update Bar Chart dynamically
  this.barChartData = {

    labels: [
      'Flats',
      'Shops',
      'Members'
    ],

    datasets: [
      {
        data: [
          this.summary.totalFlats,
          this.summary.totalShops,
          this.summary.totalMembers
        ],
        label: 'GACHSL Status'
      }
    ]
  };


  // Update Consent Pie Chart dynamically
  this.pieChartData = {

    labels: [
      'Yes',
      'No',
      'Pending'
    ],

    datasets: [
      {
        data: [
          this.summary.consentYes,
          this.summary.consentNo,
          this.summary.consentPending
        ]
      }
    ]
  };

},

      error: (err) => {

        console.error(err);

      }

    });

}
  loadDashboard(): void {

    this.dashboardService.getSummary().subscribe({

      next: (response) => {

        if (response.success && response.data) {
          this.summary = response.data;
        }

      },

      error: () => {

        this.snackbar.error('Unable to load dashboard.');

      }

    });

  }

}