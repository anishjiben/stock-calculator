import {Injectable} from '@angular/core';

@Injectable()
export class StockCalculatorService {
  private yearAndItsEPS = {};
  private epsGrowthRate: number[] = [];

  setYearAndItsEps(yearAndEps): void {
    this.yearAndItsEPS = JSON.parse(JSON.stringify(yearAndEps));
  }

  getYearAndItsEps() {
    return JSON.parse(JSON.stringify(this.yearAndItsEPS));
  }

  setEpsGrowthRate(epsGrowth: number[]): void {
    this.epsGrowthRate = [...epsGrowth];
  }

  getEpsGrowthRate(): number[] {
    return [...this.epsGrowthRate];
  }
}
