import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScorecardDataService } from '../scorecard-data.service';
import { ScorecardInterface } from '../interfaces/scorecard-interface';
import {DataService} from '../data.service';
import {HoleInterface} from '../interfaces/holes-interface';
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
  scorecard!: ScorecardInterface | null;
  holes:HoleInterface[] = [];
  isEditable: boolean = false;

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
    this.isEditable = !this.isEditable;
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
    const frontNine = this.holes.slice(0, 9);
    const backNine = this.holes.slice(9, 18);

    // Calculate totals for front nine
    this.totalMetersOut = frontNine.reduce((acc, hole) => acc + hole.Meters, 0);
    this.totalParOut = frontNine.reduce((acc, hole) => acc + hole.Par, 0);
    if (this.scorecard?.scores) {
      this.totalStrokesOut = this.scorecard.scores.slice(0, 9).reduce((acc, score) => acc + score.Strokes, 0);
    }

    // Calculate totals for back nine
    this.totalMetersIn = backNine.reduce((acc, hole) => acc + hole.Meters, 0);
    this.totalParIn = backNine.reduce((acc, hole) => acc + hole.Par, 0);
    this.totalStrokesIn = this.scorecard?.scores.slice(9, 18).reduce((acc, score) => acc + score.Strokes, 0) || 0;
  }
}
