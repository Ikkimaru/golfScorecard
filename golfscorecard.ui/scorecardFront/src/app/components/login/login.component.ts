import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import { UserDataService } from '../../user-data.service';
import { Router } from '@angular/router';
import{FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PlayerInterface} from '../../interfaces/player-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  players: any[] = [];
  username: string = '';
  password: string = '';
  playerInterface!: PlayerInterface;
  loginError: string = '';

  constructor(private readonly dataService: DataService,private readonly userDataService: UserDataService, private readonly router: Router) {}

  ngOnInit(): void {
    this.userDataService.clearUserData();
    this.loadPlayers().then(() => {
      console.log('Players loaded in OnInit:', this.players); // Now this will show the correct players
    });
  }

  async loadPlayers(): Promise<void> {
    try {
      this.players = await this.dataService.getAllPlayers();
    } catch (error) {
      console.error('Error loading players:', error);
    }
  }
  async login() {
    try {
      if (!this.username) {
        this.loginError = 'Please select a username'; // Set error message if username is not selected
        console.error('Login failed: No username selected');
        return;
      }

      this.playerInterface = await this.dataService.getLoginDetails(this.username, this.password);

      // Check if the login was successful
      if (this.playerInterface) {
        // Save user data to local storage or manage it appropriately
        this.userDataService.setUserData(this.playerInterface);
        // Navigate to the home page
        this.router.navigate(['homePage']);
      } else {
        this.loginError = 'Invalid username or password'; // Set error message
        console.error('Login failed: Invalid username or password');
      }
    } catch (error) {
      this.loginError = 'An error occurred during login'; // Set error message
      console.error('Error during login:', error);
    }
  }
}
