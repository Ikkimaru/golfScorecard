import {Component, OnInit} from '@angular/core';
import { GolfCourseInterface } from '../../interfaces/golfCourse-interface';
import { TeeBoxInterface } from '../../interfaces/teeBox-interface';
import { HoleInterface } from '../../interfaces/holes-interface';
import {GolfCourseService} from '../../services/golf-course.service';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-golf-course-management',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './golf-course-management.component.html',
  styleUrl: './golf-course-management.component.css'
})
export class GolfCourseManagementComponent implements OnInit{
  golfCourses: GolfCourseInterface[] = [];
  teeBoxes: TeeBoxInterface[] = [];
  holes: HoleInterface[] = [];

  selectedCourse: GolfCourseInterface | null = null;
  selectedTeeBox: TeeBoxInterface | null = null;

  newCourse: GolfCourseInterface = {
    id: 0, // Placeholder; actual ID will be set by the backend
    CourseName: '',
    Location: '',
    TotalHoles: 0,
  };

  newTeeBox: TeeBoxInterface = {
    id: 0,
    GolfCourseID: 0, // This will be set dynamically based on selectedCourse
    Color: '',
    Yardage: 0,
    Meters: 0,
    CourseRating: 0,
    CoursePar: 0
  };

  newHole: Partial<HoleInterface> = {};

  constructor(private readonly golfCourseService: GolfCourseService) {}

  async ngOnInit(): Promise<void> {
    this.golfCourses = await this.golfCourseService.getAllGolfCourses();
  }

  async selectCourse(course: GolfCourseInterface, event?: KeyboardEvent): Promise<void> {
    if (event && event.type === 'keydown' && (event.key !== 'Enter' && event.key !== ' ')) {
      return; // Ignore keys other than Enter or Space
    }

    this.selectedCourse = course;
    console.log('Course selected:', course.CourseName);

    // Fetch tee boxes and reset holes
    this.teeBoxes = await this.golfCourseService.getTeeBoxesByCourseId(course.id);
    this.holes = [];
  }


  async selectTeeBox(teeBox: TeeBoxInterface, event?: KeyboardEvent): Promise<void> {
    if (event && event.type === 'keydown' && (event.key !== 'Enter' && event.key !== ' ')) {
      return; // Ignore keys other than Enter or Space
    }

    this.selectedTeeBox = teeBox;
    console.log('Tee box selected:', teeBox.Color);

    // Fetch holes based on the selected tee box
    this.holes = await this.golfCourseService.getHolesByTeeBoxId(teeBox.id);
  }


  async addCourse(): Promise<void> {
    if (!this.newCourse.CourseName || !this.newCourse.Location || this.newCourse.TotalHoles <= 0) {
      console.error('All fields are required, and Total Holes must be greater than 0.');
      return;
    }

    const addedCourse = await this.golfCourseService.addGolfCourse(this.newCourse);

    if (addedCourse) {
      console.log('Course added successfully:', addedCourse);
      // Refresh the list of golf courses after adding the new one
      await this.loadGolfCourses(); // Method to fetch and update the list of courses
      this.newCourse = {
        id: 0,
        CourseName: '',
        Location: '',
        TotalHoles: 0,
      }; // Reset the form
    } else {
      console.error('Failed to add course.');
    }
  }

// Method to fetch the updated list of golf courses
  async loadGolfCourses(): Promise<void> {
    this.golfCourses = await this.golfCourseService.getAllGolfCourses(); // Assuming getGolfCourses fetches the data
  }


  // Add a new tee box
  async addTeeBox(): Promise<void> {
    if (!this.newTeeBox.Color || this.newTeeBox.Yardage <= 0 || this.newTeeBox.Meters <= 0) {
      console.error('All fields are required and Yardage/Meters must be greater than 0.');
      return;
    }

    if (this.selectedCourse) {
      this.newTeeBox.GolfCourseID = this.selectedCourse.id; // Set GolfCourseID based on selectedCourse
    }

    try {
      // Map frontend data to backend format
      const addedTeeBox = await this.golfCourseService.addTeeBox(this.newTeeBox);

      if (addedTeeBox) {
        console.log('Tee box added successfully:', addedTeeBox);

        // Update the list of tee boxes for the selected course
        this.teeBoxes.push(addedTeeBox);

        // Reset the form for the new tee box
        this.newTeeBox = {
          id: 0,
          GolfCourseID: 0,
          Color: '',
          Yardage: 0,
          Meters: 0,
          CourseRating: 0,
          CoursePar: 0
        };

        // Optionally refresh the list of tee boxes if needed
        await this.loadTeeBoxes();
      } else {
        console.error('Failed to add tee box.');
      }
    } catch (error) {
      console.error('Error adding tee box:', error);
    }
  }

// Method to fetch the updated list of tee boxes for the selected course
  async loadTeeBoxes(): Promise<void> {
    if (this.selectedCourse) {
      this.teeBoxes = await this.golfCourseService.getTeeBoxesByCourseId(this.selectedCourse.id);
    }
  }


  async addHole(): Promise<void> {
    if (this.selectedTeeBox && this.newHole.HoleNumber) {
      this.newHole.TeeBoxID = this.selectedTeeBox.id;
      const addedHole = await this.golfCourseService.addHole(this.newHole as HoleInterface);
      if (addedHole) {
        this.holes.push(addedHole);
        this.newHole = {};
      }
    }
  }

  async updateCourse(course: GolfCourseInterface): Promise<void> {
    const updatedCourse = await this.golfCourseService.updateGolfCourse(course);
    if (updatedCourse) {
      const index = this.golfCourses.findIndex((c) => c.id === course.id);
      if (index !== -1) this.golfCourses[index] = updatedCourse;
    }
  }

  async deleteCourse(course: GolfCourseInterface): Promise<void> {
    if (await this.golfCourseService.deleteGolfCourse(course.id)) {
      this.golfCourses = this.golfCourses.filter((c) => c.id !== course.id);
      if (this.selectedCourse === course) {
        this.selectedCourse = null;
        this.teeBoxes = [];
        this.holes = [];
      }
    }
  }

  async deleteTeeBox(teeBox: TeeBoxInterface): Promise<void> {
    if (await this.golfCourseService.deleteTeeBox(teeBox.id)) {
      this.teeBoxes = this.teeBoxes.filter((t) => t.id !== teeBox.id);
      if (this.selectedTeeBox === teeBox) {
        this.selectedTeeBox = null;
        this.holes = [];
      }
    }
  }

  async deleteHole(hole: HoleInterface): Promise<void> {
    if (await this.golfCourseService.deleteHole(hole.id)) {
      this.holes = this.holes.filter((h) => h.id !== hole.id);
    }
  }
}
