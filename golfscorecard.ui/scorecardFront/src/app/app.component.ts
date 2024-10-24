// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { HoleInterface } from './interfaces/holes-interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { GolfCourseInterface } from './interfaces/golfCourse-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = "Home"
  //data: HoleInterface[] = []; // Updated to be an array of Hole objects
  data: GolfCourseInterface[] = [];
  
  constructor(private dataService: DataService) {} // Inject the data service

  async ngOnInit(): Promise<void> {
    // try {
    //   this.data = await this.dataService.getAllHoles(); // Fetch data
    //   console.log('Fetched AllHoles Data'); // Log fetched data
    // } catch (error) {
    //   console.error('Error fetching data:', error); // Log any errors
    // }
    try {
      this.data = await this.dataService.getAllCourses(); // Fetch data
      console.log('Fetched AllCourses Data' + this.data); // Log fetched data
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    }
  }
}
