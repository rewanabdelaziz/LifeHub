import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { HomeDataService } from 'src/app/services/home-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  loginSuccess: Boolean = false;
  totalRecipients:number=0;
  totalDonars:number=0;
  totalRegesister:number=0;
  value = sessionStorage.getItem("token") !== null;


  constructor(private authService: AuthService, private dataService:HomeDataService){
    this.loginSuccess = this.authService.getVariable();
  }
  ngOnInit(): void {
    this.fetchTotalRecipients();
    this.fetchTotalDonars();
    this.fetchTotalRegesiters();
  }

  fetchTotalRecipients(): void {
    this.dataService.getTotalRecipients().subscribe(response => {
      this.totalRecipients = response.total_Recipints;
      // console.log(this.totalRecipients);
    });
  }
  fetchTotalDonars(): void {
    this.dataService.getTotalDonars().subscribe(response => {
      this. totalDonars = response.total_Donners;
      // console.log(this.totalDonars);
    });
  }
  fetchTotalRegesiters(): void {
    this.dataService.getTotalRegeisters().subscribe(response => {
      this. totalRegesister = response.totalRegisters;
      // console.log(this.totalRegesister);
    });
  }

}
