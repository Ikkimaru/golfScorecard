import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {UserDataService} from '../../user-data.service';
import {PlayerInterface} from '../../interfaces/player-interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  currentUser: PlayerInterface | null = null;
  isLoading: boolean = true;

  constructor(private readonly userDataService: UserDataService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData() {
    try {
    [this.currentUser] = await Promise.all([this.userDataService.getUserData()]);
    this.isLoading = false; // Set loading to false after data is loaded
    } catch (error) {
      console.error('Error loading players:', error);
    }
  }

  logout() {
    this.userDataService.clearUserData();
    this.currentUser = null;
    this.router.navigate([''])
  }
}
