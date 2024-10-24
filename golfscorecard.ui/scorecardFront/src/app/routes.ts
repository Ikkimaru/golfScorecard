import { Routes } from '@angular/router';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'scorecard',
    component: ScorecardComponent,
    title: 'View Scorecards',
  },
  {
    path: 'golfcourse/:id',
    component: ScorecardComponent,
    title: 'View Golfcourse',
  },
];

export default routeConfig;
