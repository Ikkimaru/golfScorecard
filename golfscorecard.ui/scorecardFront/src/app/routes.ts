import {Routes} from '@angular/router';
import {ScorecardComponent} from './scorecard/scorecard.component';
import {ViewScorecardsComponent} from './view-scorecards/view-scorecards.component';
import {GolfCourseComponent} from './golf-course/golf-course.component';
import {HomeComponent} from './home/home.component';
import {PlayerComponent} from './player/player.component';

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
    path: 'golfcourses',
    component: GolfCourseComponent,
    title: 'View Golfcourse',
  },
  {
    path: 'scorecards/:id',
    component: ScorecardComponent,
    title: 'View Scorecards',
  },
  {
    path: 'view-scorecards',
    component: ViewScorecardsComponent,
    title: 'View Scorecards',
  },
  {
    path: 'players/:id',
    component: PlayerComponent,
    title: 'View Player',
  },
];

export default routeConfig;
