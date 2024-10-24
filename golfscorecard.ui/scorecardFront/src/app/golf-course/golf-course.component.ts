import { Component } from '@angular/core';
import { GolfCourseInterface } from '../interfaces/golfCourse-interface';

@Component({
  selector: 'app-golf-course',
  standalone: true,
  imports: [],
  templateUrl: './golf-course.component.html',
  styleUrl: './golf-course.component.css',
})
export class GolfCourseComponent {
  golfCourse!: GolfCourseInterface;
}
