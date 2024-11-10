// src/app/data.service.ts

import {Injectable} from '@angular/core';
import {HoleInterface} from './interfaces/holes-interface';
import {GolfCourseInterface} from './interfaces/golfCourse-interface';
import {ScorecardInterface} from './interfaces/scorecard-interface';
import {PlayerInterface} from './interfaces/player-interface';

@Injectable({
  providedIn: 'root'  // This service is provided at the root level
})
export class DataService {
  private url = 'http://localhost:3000/';  // The URL to the backend endpoint

  constructor() {
  }

  async getLoginDetails(username: string, password: string): Promise<any> {
    try {
      const response = await fetch(this.url + "login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }
      const result = await response.json();
      return result.data ?? null; // Extract the data or return null if not present
    } catch (error) {
      console.error('Error fetching User:', error);
      return null; // Return null on error
    }
  }


  async getAllHoles(): Promise<HoleInterface[]> {
    try {
      const response = await fetch(this.url + "holes");
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching holes:', error);
      return []; // Return an empty array on error
    }
  }

  async getAllCourses(): Promise<GolfCourseInterface[]> {
    try {
      const response = await fetch(this.url + "golfcourses");
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching Courses:', error);
      return []; // Return an empty array on error
    }
  }

  async getAllScorecards(): Promise<ScorecardInterface[]> {
    try {
      const response = await fetch(this.url + "scorecards");
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching Scorecards:', error);
      return []; // Return an empty array on error
    }
  }
  async getScorecardsPerPlayer(id:number): Promise<ScorecardInterface[]> {
    try {
      const response = await fetch(this.url + "scorecards/playerscorecard/" + id);
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching Player Scorecards:', error);
      return []; // Return an empty array on error
    }
  }

  async getPopulatedScorecard(id: number): Promise<ScorecardInterface | null> {
    try {
      const response = await fetch(`${this.url}scorecards/populated/${id}`);
      const result = await response.json();
      return result.data ?? null; // Return the single scorecard object, or null if not present
    } catch (error) {
      console.error('Error fetching Scorecard:', error);
      return null; // Return null on error to indicate no data
    }
  }

  async getHoleById(id: number): Promise<HoleInterface | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      const result = await response.json();
      return result.data; // Assuming the single hole object is returned
    } catch (error) {
      console.error(`Error fetching hole with ID ${id}:`, error);
      return undefined; // Return undefined on error
    }
  }

  async getHolesByCourseId(id: number): Promise<HoleInterface []> {
    try {
      const response = await fetch(`${this.url}holes/golfCourse/${id}`);
      const result = await response.json();
      return result.data; // Assuming the single hole object is returned
    } catch (error) {
      console.error(`Error fetching hole with ID ${id}:`, error);
      return []; // Return undefined on error
    }
  }

  async getPlayerById(id: number): Promise<PlayerInterface | undefined> {
    try {
      const response = await fetch(`${this.url}players/${id}`);
      const result = await response.json();
      return result.data; // Assuming the single hole object is returned
    } catch (error) {
      console.error(`Error fetching hole with ID ${id}:`, error);
      return undefined; // Return undefined on error
    }
  }

  async getAllPlayers(): Promise<PlayerInterface[]> {
    try {
      const response = await fetch(this.url + "players");
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching players:', error);
      return []; // Return an empty array on error
    }
  }

}
