import { Injectable } from '@angular/core';
import {GolfCourseInterface} from '../interfaces/golfCourse-interface';
import { TeeBoxInterface } from '../interfaces/teeBox-interface';
import {HoleInterface} from '../interfaces/holes-interface';

@Injectable({
  providedIn: 'root'
})
export class GolfCourseService {
  private readonly url = 'http://localhost:3000/'; // Backend API endpoint

  constructor() {}

  mapCourseToBackend(course: GolfCourseInterface) {
    return {
      courseName: course.CourseName,
      courseLocation: course.Location,
      totalHoles: course.TotalHoles,
    };
  }

  mapTeeBoxToBackend(teeBox: TeeBoxInterface) {
    return {
      golfCourseID: teeBox.GolfCourseID,
      color: teeBox.Color,
      yardage: teeBox.Yardage,
      meters: teeBox.Meters,
      courseRating: teeBox.CourseRating,
      coursePar: teeBox.CoursePar,
    };
  }



  // Golf Course Methods
  async getAllGolfCourses(): Promise<GolfCourseInterface[]> {
    try {
      const response = await fetch(`${this.url}golfcourses`);
      const result = await response.json();
      return result.data ?? [];
    } catch (error) {
      console.error('Error fetching golf courses:', error);
      return [];
    }
  }

  async addGolfCourse(course: GolfCourseInterface): Promise<GolfCourseInterface | null> {
    try {
      // Map frontend data to backend format
      const mappedCourse = this.mapCourseToBackend(course);

      const response = await fetch(`${this.url}golfcourses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedCourse), // Send mapped data to the backend
      });

      // Check if the response is successful
      if (!response.ok) {
        console.error('Failed to add golf course:', response.statusText);
        return null;
      }

      const result = await response.json();

      // Log the result to check for any issues
      console.log('Response from server:', result);

      // Adjust based on actual response structure
      return result.data ?? null;
    } catch (error) {
      console.error('Error adding golf course:', error);
      return null;
    }
  }



  async updateGolfCourse(course: GolfCourseInterface): Promise<GolfCourseInterface | null> {
    try {
      const response = await fetch(`${this.url}golfcourses/${course.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      const result = await response.json();
      return result.data ?? null;
    } catch (error) {
      console.error('Error updating golf course:', error);
      return null;
    }
  }

  async deleteGolfCourse(courseId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}golfcourses/${courseId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting golf course:', error);
      return false;
    }
  }

  // Tee Box Methods
  async getTeeBoxesByCourseId(courseId: number): Promise<TeeBoxInterface[]> {
    try {
      const response = await fetch(`${this.url}teeboxes/golfCourse/${courseId}`);
      const result = await response.json();
      return result.data ?? [];
    } catch (error) {
      console.error('Error fetching tee boxes:', error);
      return [];
    }
  }

  async addTeeBox(teeBox: TeeBoxInterface): Promise<TeeBoxInterface | null> {
    try {
      // Map frontend data to backend format
      const mappedTeeBox = this.mapTeeBoxToBackend(teeBox);

      const response = await fetch(`${this.url}teeboxes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mappedTeeBox), // Send mapped data to the backend
      });

      // Check if the response is successful
      if (!response.ok) {
        console.error('Failed to add tee box:', response.statusText);
        return null;
      }

      const result = await response.json();

      // Log the result to check for any issues
      console.log('Response from server:', result);

      // Adjust based on actual response structure
      return result.data ?? null;
    } catch (error) {
      console.error('Error adding tee box:', error);
      return null;
    }
  }


  async updateTeeBox(teeBox: TeeBoxInterface): Promise<TeeBoxInterface | null> {
    try {
      const response = await fetch(`${this.url}teeboxes/${teeBox.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teeBox),
      });
      const result = await response.json();
      return result.data ?? null;
    } catch (error) {
      console.error('Error updating tee box:', error);
      return null;
    }
  }

  async deleteTeeBox(teeBoxId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}teeboxes/${teeBoxId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting tee box:', error);
      return false;
    }
  }

  // Hole Methods
  async getHolesByTeeBoxId(teeBoxId: number): Promise<HoleInterface[]> {
    try {
      const response = await fetch(`${this.url}holes/teebox/${teeBoxId}`);
      const result = await response.json();
      return result.data ?? [];
    } catch (error) {
      console.error('Error fetching holes:', error);
      return [];
    }
  }

  async addHole(hole: HoleInterface): Promise<HoleInterface | null> {
    try {
      const response = await fetch(`${this.url}holes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hole),
      });
      const result = await response.json();
      return result.data ?? null;
    } catch (error) {
      console.error('Error adding hole:', error);
      return null;
    }
  }

  async updateHole(hole: HoleInterface): Promise<HoleInterface | null> {
    try {
      const response = await fetch(`${this.url}holes/${hole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hole),
      });
      const result = await response.json();
      return result.data ?? null;
    } catch (error) {
      console.error('Error updating hole:', error);
      return null;
    }
  }

  async deleteHole(holeId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}holes/${holeId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting hole:', error);
      return false;
    }
  }
}
