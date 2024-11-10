import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorecardDataService } from '../../scorecard-data.service';
import { ScorecardInterface } from '../../interfaces/scorecard-interface';
import {DataService} from '../../data.service';
import{UserDataService} from '../../user-data.service';
import {HoleInterface} from '../../interfaces/holes-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-scorecards',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-scorecards.component.html',
  styleUrl: './view-scorecards.component.css'
})
export class ViewScorecardsComponent implements OnInit {
  dataService: DataService = inject(DataService);
  userDataService : UserDataService = inject(UserDataService);
  player = this.userDataService.getUserData();
  scorecard!: ScorecardInterface | null;
  holes:HoleInterface[] = [];
  isEditable: boolean = false;
  originalScores: number[] = [];
  private originalScoresState: number[] = [];

  // Properties for totals
  totalMetersOut = 0;
  totalParOut = 0;
  totalStrokesOut = 0;

  totalMetersIn = 0;
  totalParIn = 0;
  totalStrokesIn = 0;

  constructor(private readonly scorecardDataService: ScorecardDataService) {}

  ngOnInit() {
    this.scorecard = this.scorecardDataService.getScorecard();
    if (this.scorecard) {
      this.loadCourseHoles(this.scorecard.GolfCourseID);
      this.originalScores = this.scorecard.scores.map(score => score.Strokes);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Allow: backspace, delete, tab, escape, enter and Ctrl+A, Ctrl+C, Ctrl+V
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Tab' ||
      event.key === 'Escape' ||
      event.key === 'Enter' ||
      event.ctrlKey && (event.key === 'a' || event.key === 'c' || event.key === 'v')
    ) {
      return;
    }

    // Ensure the input is 2 digits and is a number
    if ((event.key < '0' || event.key > '9') || (event.target as HTMLInputElement).value.length >= 2) {
      event.preventDefault();
    }
  }

  toggleEditability() {
    this.isEditable = !this.isEditable; // Toggle editability

    if (this.isEditable) {
      // Store original scores when entering edit mode
      if (this.scorecard && this.scorecard.scores) {
        this.originalScores = this.scorecard.scores.map(score => score.Strokes);
        this.originalScoresState = [...this.originalScores]; // Keep a copy for confirmation
      }
    } else {
      // Reset originalScores to match scorecard if canceled
      this.originalScores = [...this.originalScoresState];
    }
  }

  confirmEdit() {
    // Use a local variable for scorecard
    const scorecard = this.scorecard;

    // Check if scorecard is not null and has scores
    if (scorecard && scorecard.scores) {
      // Check if there are changes
      const hasChanged = this.originalScores.some((score, index) => {
        return score !== scorecard.scores[index]?.Strokes; // Use optional chaining
      });

      if (hasChanged) {
        // Update the scorecard with new values
        scorecard.scores.forEach((score, index) => {
          // Ensure index is within bounds before accessing scores
          if (scorecard.scores[index]) {
            scorecard.scores[index].Strokes = this.originalScores[index];
          }
        });
        alert('Scores updated successfully.');
      }
    } else {
      alert('Scorecard is not available or has no scores.');
    }

    this.isEditable = false; // Lock the inputs after confirming
  }

  private async loadCourseHoles(courseId: number): Promise<void> {
    try {
      const holes = await this.dataService.getHolesByCourseId(courseId);
      if (holes) {
        this.holes = holes;
        this.calculateTotals();
      } else {
        console.warn(`No data found for course with ID ${courseId}`);
      }
    } catch (error) {
      console.error('Error loading course holes:', error);
    }
  }

  private calculateTotals(): void {
    // Initialize totals
    this.totalMetersOut = 0;
    this.totalParOut = 0;
    this.totalMetersIn = 0;
    this.totalParIn = 0;

    const frontNine = this.holes.slice(0, 9);
    const backNine = this.holes.slice(9, 18);

    // Calculate totals for front nine
    this.totalMetersOut = frontNine.reduce((acc, hole) => acc + hole.Meters, 0);
    this.totalParOut = frontNine.reduce((acc, hole) => acc + hole.Par, 0);

    // Check if scorecard and scores exist
    if (this.scorecard && this.scorecard.scores) {
      // Ensure scores are available for front nine
      this.totalStrokesOut = this.scorecard.scores.slice(0, 9).reduce((acc, score) => acc + (score.Strokes || 0), 0);
    }

    // Calculate totals for back nine
    this.totalMetersIn = backNine.reduce((acc, hole) => acc + hole.Meters, 0);
    this.totalParIn = backNine.reduce((acc, hole) => acc + hole.Par, 0);

    // Ensure scores are available for back nine
    if (this.scorecard && this.scorecard.scores) {
      this.totalStrokesIn = this.scorecard.scores.slice(9, 18).reduce((acc, score) => acc + (score.Strokes || 0), 0);
    }
  }
  calculateDisplayScores(): { totalIn: number; totalOut: number } {
    // Safely get front nine and back nine scores
    const frontNineScores = this.scorecard?.scores.slice(0, 9) || [];
    const backNineScores = this.scorecard?.scores.slice(9, 18) || [];

    const totalIn = backNineScores.reduce((acc, score) => {
      const strokes = score.Strokes; // Convert string to number
      return acc + (isNaN(strokes) ? 0 : strokes); // Handle NaN values
    }, 0);

    const totalOut = frontNineScores.reduce((acc, score) => {
      const strokes = score.Strokes; // Convert string to number
      return acc + (isNaN(strokes) ? 0 : strokes); // Handle NaN values
    }, 0);

    return { totalIn, totalOut };
  }


}
