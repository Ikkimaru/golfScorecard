import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ScorecardInterface} from '../../interfaces/scorecard-interface';
import {GolfCourseInterface} from '../../interfaces/golfCourse-interface';
import {HoleInterface} from '../../interfaces/holes-interface';
import {TeeBoxInterface} from '../../interfaces/teeBox-interface';

@Component({
  selector: 'app-edit-scorecard',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './edit-scorecard.component.html',
  styleUrl: './edit-scorecard.component.css'
})
export class EditScorecardComponent implements OnInit {
  courseList: GolfCourseInterface[] = [];
  showHoleCountDropdown: boolean = false;
  selectedCourseId: number | null = null;
  selectedHoleCount: number = 18;
  selectedTeeBox: string = '';
  selectedCourse: GolfCourseInterface | null = null;
  scorecard: ScorecardInterface | null = null;
  holes: HoleInterface[] = [];
  teeBoxList: TeeBoxInterface[] = [];

  constructor(private readonly dataService: DataService) {}

  async ngOnInit() {
    try {
      // Fetch the list of courses for the dropdown
      this.courseList = await this.dataService.getAllCourses();

      if (this.selectedCourseId !== null && this.selectedCourseId !== undefined) {
        const selectedCourse = this.courseList.find(course => course.id === this.selectedCourseId);
        if (selectedCourse) {
          // Fetch holes based on the selected course
          this.holes = await this.dataService.getHolesByCourseId(this.selectedCourseId);
          this.teeBoxList = await this.dataService.getTeeBoxByCourseId(this.selectedCourseId);
          // If the course has 18 holes, show the option to select either 9 or 18 holes
          if (this.holes.length === 18) {
            this.showHoleCountDropdown = true;
            this.selectedHoleCount = 18; // Default to 18
          } else {
            this.showHoleCountDropdown = false;
            this.selectedHoleCount = this.holes.length; // Automatically set to the number of holes in the course
          }

          // Filter the holes based on the selected hole count (either 9 or 18)
          this.holes = this.holes.slice(0, this.selectedHoleCount);

          this.initializeScores();
        }
      }
    } catch (error) {
      console.error('Error fetching courses or holes:', error);
    }
  }

  onHoleCountChange() {
    // Reinitialize the scores based on the selected hole count
    this.initializeScores();
  }

  onTeeBoxChange() {
    console.log('Selected Tee Box Color:', this.selectedTeeBox);
    // Handle logic for the selected tee box
    // Reinitialize the scores based on the selected tee box
    this.initializeScores();
  }

  initializeScores() {
    if (this.scorecard && this.holes && this.holes.length > 0) {
      // Initialize scores based on the number of holes selected
      this.scorecard.scores = this.holes.slice(0, this.selectedHoleCount).map(hole => ({
        id: 0,
        ScorecardID: this.scorecard!.id,
        HoleID: hole.id,
        Strokes: 0,
      }));
    }
  }

  async onCourseChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const courseId = parseInt(target.value, 10);
    const selected = this.courseList.find(course => course.id === courseId);

    if (selected) {
      this.selectedCourseId = courseId;
      this.selectedCourse = selected;
      await this.loadTeeBoxes(courseId);
      this.initializeScorecard(selected);

      // Fetch holes data for the selected course
      this.holes = await this.dataService.getHolesByCourseId(courseId);

      // Reinitialize the scorecard scores
      this.initializeScores();
    }
  }

  async loadTeeBoxes(courseId: number) {
    try {
      this.teeBoxList = await this.dataService.getTeeBoxByCourseId(courseId);
    } catch (error) {
      console.error('Error loading tee boxes:', error);
      this.teeBoxList = [];
    }
  }

  initializeScorecard(course: GolfCourseInterface) {
    this.scorecard = {
      id: 0,
      PlayerID: 0,
      GolfCourseID: course.id,
      TeeBoxID: 0,
      WeatherID: 0,
      GameDate: new Date(),
      TotalScore: 0,
      HandicapIndex: 0,
      CourseHandicap: 0,
      PlayingHandicap: 0,
      playerName: 'Player Name',
      courseName: course.CourseName,
      teeBoxColor: '#FFFFFF',
      scores: Array.from({ length: course.TotalHoles }, (_, index) => ({
        id: 0,
        ScorecardID: 0,
        HoleID: index + 1,
        Strokes: 0
      }))
    };
  }


  calculateTotalPar(): number {
    return this.holes.reduce((total, hole) => total + hole.Par, 0);
  }

  calculateTotalScore() {
    if (this.scorecard) {
      this.scorecard.TotalScore = this.scorecard.scores.reduce((total, score) => total + (score.Strokes || 0), 0);
    }
  }

  saveScorecard() {
    console.log('Scorecard saved:', this.scorecard);
  }
}
