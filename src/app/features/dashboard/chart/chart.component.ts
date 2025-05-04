import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { interval, map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ChartService } from '../../../core/services/chart/chart.service';
import { Ichart } from '../../../shared/interfaces/ichart/ichart';

@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  data :Ichart[]=[{
    name:'dashboard',
    value:55
  },
  {
    name:'home',
    value:55
  },
  {
    name:'about',
    value:55
  },
];

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'customScheme'
  };

 

  private destroy$ = new Subject<void>();

  //...

  constructor(private _Charts: ChartService) {
    this._Charts.createWebsocket();
    this._Charts.storeLastValue()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.data = res;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
    


}
