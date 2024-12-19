import {Routes} from '@angular/router';
import {ScorecardComponent} from './components/scorecard/scorecard.component';
import {ViewScorecardsComponent} from './components/view-scorecards/view-scorecards.component';
import {GolfCourseComponent} from './components/golf-course/golf-course.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/player.component';
import {LoginComponent} from './components/login/login.component';
import { authGuard } from './auth.guard';
import {GeneralComponent} from './components/general/general.component';
import {EditScorecardComponent} from './components/edit-scorecard/edit-scorecard.component';
import {GolfCourseManagementComponent} from './components/golf-course-management/golf-course-management.component';

const routeConfig: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'homePage',
    component: HomeComponent,
    title: 'Home Page',
    canActivate: [authGuard]
},
  {
    path: 'home',
    component: GeneralComponent,
    title: 'Universal Page'
  },
  {
    path: 'scorecard',
    component: ScorecardComponent,
    title: 'View Scorecards',
    canActivate: [authGuard]
  },
  {
    path: 'golfcourses',
    component: GolfCourseComponent,
    title: 'View Golfcourse',
    canActivate: [authGuard]
  },
  {
    path: 'scorecards/:id',
    component: ScorecardComponent,
    title: 'View Scorecards',
    canActivate: [authGuard]
  },
  {
    path: 'view-scorecards',
    component: ViewScorecardsComponent,
    title: 'View Scorecards',
    canActivate: [authGuard]
  },
  {
    path: 'players/:id',
    component: ProfileComponent,
    title: 'View Player',
    canActivate: [authGuard]
  },
  {
    path: 'player',
    component: ProfileComponent,
    title: 'View Player',
    canActivate: [authGuard]
  },
  {
    path: 'addscore',
    component: EditScorecardComponent,
    title: 'Add Score',
    canActivate: [authGuard]
  },
  {
    path: 'courseManagement',
    component: GolfCourseManagementComponent,
    title: 'Course Management',
    canActivate: [authGuard]
  },
];

export default routeConfig;
