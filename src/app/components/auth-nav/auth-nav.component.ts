import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css',]
})
export class AuthNavComponent {

  loginSuccess:Boolean=false;
  constructor(private authService: AuthService){
    this.loginSuccess = this.authService.getVariable();
  }

  menuVariable:boolean = false;

  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

}