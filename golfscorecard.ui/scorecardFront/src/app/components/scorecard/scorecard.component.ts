import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ScorecardInterface} from '../../interfaces/scorecard-interface';
import {DataService} from '../../data.service';
import {UserDataService} from '../../user-data.service';
import {ScorecardDataService} from '../../scorecard-data.service';

@Component({
  selector: 'app-scorecard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css'],
})
export class ScorecardComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  scoreCards: ScorecardInterface[] = [];
  dataService: DataService = inject(DataService);
  userDataService: UserDataService = inject(UserDataService);
  scorecardDataService: ScorecardDataService = inject(ScorecardDataService);
  isLoading: boolean = true;

  constructor(
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    let playerId = Number(this.route.snapshot.params['id']); // Get playerId from route
    if (!playerId) {
      playerId = this.userDataService.getUserData()?.id ?? 0; // Try to get it from userDataService
    }
    // If playerId is valid (not 0), load player data
    if (playerId) {
      this.loadScorecards(playerId);
    } else {
      console.warn('No playerId available. Player data will not be loaded.');
    }
  }

  navigateToScorecard(scorecard: ScorecardInterface): void {
    this.scorecardDataService.setScorecard(scorecard); // Store scorecard data
    this.router.navigate(['/view-scorecards']).then(() => this.isLoading = false); // Navigate to the view-scorecards route
  }

  private async loadScorecards(playerId: number): Promise<void> {
    try {
      const scoreCards = await this.dataService.getScorecardsPerPlayer(playerId);
      this.populateScorecards(scoreCards);
    } catch (error) {
      console.error('Error loading scorecards:', error);
      this.isLoading = false;
    }
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
}
