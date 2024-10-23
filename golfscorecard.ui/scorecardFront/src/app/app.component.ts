// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Hole } from './interfaces/holes-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  title = "scorecardFront"
  data: Hole[] = []; // Updated to be an array of Hole objects
  
  constructor(private dataService: DataService) {} // Inject the data service

  async ngOnInit(): Promise<void> {
    try {
      this.data = await this.dataService.getAllHoles(); // Fetch data
      console.log('Fetched AllHoles Data'); // Log fetched data
    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors
    }
  }
}
