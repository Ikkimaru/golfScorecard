import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {


  constructor(private readonly router: Router){}
  navigateHome() {
    this.router.navigate(['/']); // Adjust the route as needed
  }
}
