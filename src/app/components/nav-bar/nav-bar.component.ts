import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loginSuccess:Boolean=false;
  constructor(private authService: AuthService){
    this.loginSuccess = this.authService.getVariable();
  }

  menuVariable:boolean = false;

  openMenu(){
    this.menuVariable =! this.menuVariable;
  }
}
