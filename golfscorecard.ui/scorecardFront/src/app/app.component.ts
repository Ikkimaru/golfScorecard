// src/app/app.component.ts

import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from "@angular/router";
import {LoginComponent} from './components/login/login.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, LoginComponent, NavBarComponent]
})
export class AppComponent implements OnInit{
  title = "Home"
  showNavBar: boolean = true; // Default to true to show nav bar

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //console.log('Current URL:', this.router.url); // Log the current URL
        this.showNavBar = !this.router.url.includes('/login');
      });
  }

}
