import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserDataService} from '../../user-data.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  currentUser: {username: string, password: string } | null = null;
  isLoading: boolean = true;

  constructor(private readonly userDataService: UserDataService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData() {
    [this.currentUser] = await Promise.all([this.userDataService.getUserData()]);
    console.log('Loaded User Data:', this.currentUser);
    this.isLoading = false; // Set loading to false after data is loaded
  }

  logout() {
    this.userDataService.clearUserData();
    this.currentUser = null;
    this.router.navigate([''])
  }
}
