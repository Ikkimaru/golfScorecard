import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {PlayerInterface} from '../../interfaces/player-interface';
import {DataService} from '../../data.service';
import {UserDataService} from '../../user-data.service';
import {ScorecardDataService} from '../../scorecard-data.service';
import {NavBarComponent} from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  currentUser: PlayerInterface | null = null;

  constructor(private userDataService: UserDataService, private readonly router: Router) {
  }

  players: PlayerInterface[] = [];
  dataService: DataService = inject(DataService);

  async ngOnInit() {
    this.currentUser = this.userDataService.getUserData();
    this.players = await this.dataService.getAllPlayers();
  }

  logout() {
    this.userDataService.clearUserData();
    this.currentUser = null;
    this.router.navigate([''])
  }
}
