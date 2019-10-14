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

  epsGrowthPercentages: number[] = [];
  epsGrowthRate = 0;
  cmp = 0;
  peRatio: number;

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
  calculateEpsGrowthPercentages(): void {
    this.epsGrowthPercentages = [];
    for (let i = 0; i < this.stabilityCheckTableColumns.length - 1; i++) {
      const presentEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[i]];
      const previousEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[i + 1]];
      let growthRate = (presentEps - previousEps) / previousEps;
      growthRate = growthRate * 100;
      this.epsGrowthPercentages.push(+growthRate.toFixed(2));
    }
    this.calculateEpsGrowthRate();
  }

  calculateEpsGrowthRate(): void {
    const lastYearEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[0]];
    const baseYearEps = this.fiscalYearAndEps[this.stabilityCheckTableColumns[this.stabilityCheckTableColumns.length - 1]];
    let growthRate = +(lastYearEps / baseYearEps).toFixed(2);
    growthRate = Math.pow(growthRate, 1 / this.epsGrowthPercentages.length) - 1;
    this.epsGrowthRate = +(+growthRate * 100).toFixed(2);
  }

  calculatePeRation(): void {
    this.peRatio = +(this.cmp / this.fiscalYearAndEps[this.stabilityCheckTableColumns[0]]).toFixed(2);
  }

}
