import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScorecardDataServiceTsService {
  private scorecardData: any;

  setScorecardData(data: any) {
    this.scorecardData = data;
  }

  getScorecardData() {
    return this.scorecardData;
  }

  clearScorecardData() {
    this.scorecardData = null;
  }
  constructor() { }
}
