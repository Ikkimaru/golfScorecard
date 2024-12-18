import { Injectable } from '@angular/core';
import {PlayerInterface} from '../interfaces/player-interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private storageKey = 'currentUser';
playerInterface!:PlayerInterface;
  constructor() {}

  // Save user data to localStorage
  setUserData(playerInterface: PlayerInterface) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(playerInterface));
    }
  }

  // Retrieve user data from localStorage
  getUserData(): PlayerInterface | null {
    if (this.isLocalStorageAvailable()) {
      const userData = localStorage.getItem(this.storageKey);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Clear user data from localStorage
  clearUserData() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return !!this.getUserData();
  }

  // Helper method to check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
