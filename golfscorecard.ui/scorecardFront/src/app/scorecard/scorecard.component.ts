import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ScorecardInterface } from '../interfaces/scorecard-interface';
import { DataService } from '../data.service';
import {ScorecardDataService} from '../scorecard-data.service'
import { HomeButtonComponent } from "../home-button/home-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-scorecard',
  standalone: true,
  imports: [CommonModule,HomeButtonComponent],
  templateUrl: './scorecard.component.html',
  styleUrl: './scorecard.component.css',
})
export class ScorecardComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  scoreCards: ScorecardInterface[] = [];
  dataService: DataService = inject(DataService);
  isLoading: boolean = true;

  constructor(private scorecardDataService: ScorecardDataService, private router:Router) {
    const courseId = Number(this.route.snapshot.params['id']);

    // Load all scorecards and filter by course ID
    this.dataService.getAllScorecards()
      .then((scoreCards: ScorecardInterface[]) => {
        const filteredScorecards = scoreCards.filter(
          (scoreCard) => scoreCard.GolfCourseID === courseId
        );
        
        // Fetch populated data for each filtered scorecard
        this.populateScorecards(filteredScorecards);
      })
      .catch(error => {
        console.error('Error loading scorecards:', error);
        this.isLoading = false;
      });
  }

  private populateScorecards(scoreCards: ScorecardInterface[]): void {
    const populatedPromises = scoreCards.map((scoreCard) =>
      this.dataService.getPopulatedScorecard(scoreCard.id)
        .then((populatedScorecard) => {
          if (populatedScorecard) { // Only push if populatedScorecard is not null
            this.scoreCards.push(populatedScorecard);
          } else {
            console.warn(`No data found for scorecard ${scoreCard.id}`);
          }
        })
        .catch(error => {
          console.error(`Error populating scorecard ${scoreCard.id}:`, error);
        })
    );
  
    // Once all promises are resolved, set loading to false
    Promise.all(populatedPromises)
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error in populating scorecards:', error);
        this.isLoading = false;
      });
  }

  navigateToScorecard(scorecard: ScorecardInterface) {
    this.scorecardDataService.setScorecard(scorecard); // Store scorecard data
    this.router.navigate(['/view-scorecards']); // Navigate to the view-scorecards route
  }
  
}

