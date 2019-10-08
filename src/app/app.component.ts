import {Component} from '@angular/core';
import {EpsYear} from './modals';
import {StockCalculatorService} from './stock-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  epsStartDate: Date;
  epsFinishDate: Date;
  fiscalYearAndEps = {};
  stabilityCheckTableColumns = [];
  stabilityCheckTable = [];
  epsGrowthRate: number[] = [];

  constructor(private stockCalclatorService: StockCalculatorService) {
  }

  onYearSelected(): void {
    const numberOfYears = this.epsFinishDate.getFullYear() - this.epsStartDate.getFullYear();
    let lastYear = this.epsFinishDate.getFullYear();
    for (let i = 1; i <= numberOfYears; i++) {
      const previousYear = lastYear - 1;
      this.fiscalYearAndEps[lastYear + '-' + previousYear] = 0;
      lastYear = previousYear;
    }
    this.stabilityCheckTable = [this.fiscalYearAndEps];
    this.stabilityCheckTableColumns = Object.keys(this.fiscalYearAndEps);
    this.stockCalclatorService.setYearAndItsEps(this.fiscalYearAndEps);
    console.log(this.fiscalYearAndEps);
  }

  /**
   * calculate the eps growth using the formulat (present-previous)/previous
   * where present is latest year, and previous is the last year
   */
  calculateEpsGrowthRate(): void {
    this.epsGrowthRate = [];
    for (let i = 0; i < this.stabilityCheckTableColumns.length - 1; i++) {
      const presentEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[i]];
      const previousEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[i + 1]];
      let growthRate = (presentEps - previousEps) / previousEps;
      growthRate = growthRate * 100;
      this.epsGrowthRate.push(+growthRate.toFixed(2));
    }
  }

}
