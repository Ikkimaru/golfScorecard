import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {PlayerInterface} from '../interfaces/player-interface';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  players: PlayerInterface[] = [];
  dataService: DataService = inject(DataService);

  async ngOnInit() {
    this.players = await this.dataService.getAllPlayers();
  }
}
