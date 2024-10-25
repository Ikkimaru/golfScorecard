import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GolfCourseInterface } from '../interfaces/golfCourse-interface';
import { DataService } from '../data.service';
import { RouterModule } from '@angular/router';
import { HomeButtonComponent } from '../home-button/home-button.component';

@Component({
  selector: 'app-golf-course',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeButtonComponent],
  templateUrl: './golf-course.component.html',
  styleUrl: './golf-course.component.css',
})
export class GolfCourseComponent {
  courseList: GolfCourseInterface[] = [];
  dataService: DataService = inject(DataService);
  constructor() {
    this.dataService
      .getAllCourses()
      .then((courseList: GolfCourseInterface[]) => {
        this.courseList = courseList;
      });
  }
}
