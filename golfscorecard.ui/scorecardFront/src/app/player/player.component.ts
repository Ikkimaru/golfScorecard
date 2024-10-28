import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerInterface} from '../interfaces/player-interface';
import {ScorecardInterface} from '../interfaces/scorecard-interface';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {ScorecardComponent} from '../scorecard/scorecard.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ScorecardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  player: PlayerInterface | null = null;
  scorecards: ScorecardInterface[] = [];
  dataService: DataService = inject(DataService);

  ngOnInit(): void {
    const playerId = Number(this.route.snapshot.params['id'])
    if (playerId) {
      this.loadPlayerData(playerId);
    }
  }

  private async loadPlayerData(playerId: number): Promise<void> {
    try {
      const player = await this.dataService.getPlayerById(playerId);
      if (player) {
        this.player = player;
      } else {
        console.warn(`No data found for player with ID ${playerId}`);
      }
    } catch (error) {
      console.error('Error loading player data:', error);
    }
  }

}
