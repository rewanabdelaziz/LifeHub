import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(){}
  menuVariable:boolean = false;

  openMenu(){
    this.menuVariable =! this.menuVariable;
  }
}
