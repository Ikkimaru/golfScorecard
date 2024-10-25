import { Injectable } from '@angular/core';
import { ScorecardInterface } from './interfaces/scorecard-interface';

@Injectable({
  providedIn: 'root'
})
export class ScorecardDataService {
  private storageKey = 'scorecardData';

  setScorecard(data: ScorecardInterface) {
    localStorage.setItem(this.storageKey, JSON.stringify(data)); // Store in local storage
  }

  getScorecard(): ScorecardInterface | null {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const scorecardData = JSON.parse(data);
      return scorecardData; // Return the parsed data
    }
    return null; // Return null if no data is found
  }
}
