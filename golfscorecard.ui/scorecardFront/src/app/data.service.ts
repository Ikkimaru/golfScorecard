// src/app/data.service.ts

import { Injectable } from '@angular/core';
import { Hole } from './interfaces/holes-interface'; // Ensure you have a model for Hole

@Injectable({
  providedIn: 'root'  // This service is provided at the root level
})
export class DataService {
  private url = 'http://localhost:3000/holes';  // The URL to the backend endpoint

  constructor() {}

  async getAllHoles(): Promise<Hole[]> {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      return result.data ?? []; // Extract the data array or return an empty array if not present
    } catch (error) {
      console.error('Error fetching holes:', error);
      return []; // Return an empty array on error
    }
  }

  async getHoleById(id: number): Promise<Hole | undefined> {
    try {
      const response = await fetch(`${this.url}/${id}`);
      const result = await response.json();
      return result.data; // Assuming the single hole object is returned
    } catch (error) {
      console.error(`Error fetching hole with ID ${id}:`, error);
      return undefined; // Return undefined on error
    }
  }
}
