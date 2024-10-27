import { Component, inject, OnInit } from '@angular/core';
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
  styleUrls: ['./golf-course.component.css'],
})
export class GolfCourseComponent implements OnInit {
  courseList: GolfCourseInterface[] = [];
  dataService: DataService = inject(DataService);

  constructor() {}

  async ngOnInit() {
    this.courseList = await this.dataService.getAllCourses();
  }
}
