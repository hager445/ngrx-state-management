import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { interval, map, Observable, Subject, Subscription } from 'rxjs';
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

  private supscription: Subscription;

  constructor(private _Charts: ChartService) {
     
       this._Charts.createWebsocket();  
       this.supscription = this._Charts.storeLastValue().subscribe(res => {
        console.log(res);
         this.data=res;
      });
      }
      
      ngOnDestroy() {
        // Unsubscribe when the component is destroyed to avoid memory leaks
        if (this.supscription) {
          this.supscription.unsubscribe();
        }
      }
    


}
