import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { Router } from '@angular/router';
import{FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import * as bcrypt from 'bcryptjs';
import {GeneralComponent} from '../general/general.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(private readonly userDataService: UserDataService, private readonly router: Router) {}

  ngOnInit(): void {
    this.userDataService.clearUserData();
  }

  async login() {
    // Hash the password
    //const hashedPassword = await this.hashPassword(this.password);
    const hashedPassword = "a";

    // Here you would typically send the hashed password to your backend for verification
    // For example, you can call an authentication service
    // this.authService.login(this.username, hashedPassword).subscribe(...);

    // Assuming the authentication was successful:
    this.userDataService.setUserData({ username: this.username, password: hashedPassword });
    this.router.navigate(['homePage']);
  }

  private async hashPassword(password: string): Promise<string> {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
