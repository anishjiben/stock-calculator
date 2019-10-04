import {Component} from '@angular/core';
import {EpsYear} from './modals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  epsStartDate: Date;
  epsFinishDate: Date;
  epsOfRangeOfYears: Array<EpsYear> = [];

  constructor() {
  }

  onYearSelected(): void {
    const numberOfYears = this.epsFinishDate.getFullYear() - this.epsStartDate.getFullYear();
    let lastYear = this.epsFinishDate.getFullYear();
    for (let i = 1; i <= numberOfYears; i++) {
      const previousYear = lastYear - 1;
      const epsYear = {
        fromTo: lastYear + '-' + previousYear,
        eps: 0
      };
      lastYear = previousYear;
      this.epsOfRangeOfYears.push(epsYear);
    }
    console.log(this.epsOfRangeOfYears);
  }

}
