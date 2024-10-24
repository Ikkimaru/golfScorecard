import { Component } from '@angular/core';
import { ScorecardInterface } from '../interfaces/scorecard-interface';

@Component({
  selector: 'app-scorecard',
  standalone: true,
  imports: [],
  templateUrl: './scorecard.component.html',
  styleUrl: './scorecard.component.css'
})
export class ScorecardComponent {
 scorecard!: ScorecardInterface;
}
