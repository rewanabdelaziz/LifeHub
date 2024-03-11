import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginSuccess:Boolean=false;
  constructor(private authService: AuthService){
    this.loginSuccess = this.authService.getVariable();
  }

}
