import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorecardDataService } from '../scorecard-data.service';
import { ScorecardInterface } from '../interfaces/scorecard-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-scorecards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-scorecards.component.html',
  styleUrl: './view-scorecards.component.css'
})
export class ViewScorecardsComponent implements OnInit {
  scorecard!: ScorecardInterface | null;

  constructor(private scorecardDataService: ScorecardDataService) {}

  ngOnInit() {
    this.scorecard = this.scorecardDataService.getScorecard();
  }
}
