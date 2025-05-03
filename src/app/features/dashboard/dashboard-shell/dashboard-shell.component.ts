import { Component } from '@angular/core';
import { ChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-dashboard-shell',
  imports: [ChartComponent],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css'
})
export class DashboardShellComponent {

}
