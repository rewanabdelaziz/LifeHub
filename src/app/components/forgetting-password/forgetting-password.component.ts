import { Component } from '@angular/core';
  import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetting-password',
  templateUrl: './forgetting-password.component.html',
  styleUrls: ["./forgetting-password.component.css"],

})
export class ForgettingPasswordComponent {
constructor(private router: Router) {}

 backLogin(){
      this.router.navigate(['./login']);
  }
}
