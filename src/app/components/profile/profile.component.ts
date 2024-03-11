import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  // standalone: true,
  // imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  loginSuccess:Boolean=false;
  constructor(private authService: AuthService){
    this.loginSuccess = this.authService.getVariable();
  }
  isPersonalInfoVisible: boolean = true;

  //  dummy values
  personalInfo = {
    email: 'anyEmail@gmail.com',
    phone: '+201111111110',
    nationalId: 'YourNationalID',
    nearestHospital: 'Nearest Hospital',
    gender: 'Gender',
    birthdate: '00/00/0000'
  };

  medicalInfo = {
    bloodType: 'Blood Type',
    lastDonate: 'Last Donate',
    totalDonate: 'Total Number of Donate',
    donateBlood: 'Number of Donate Blood',
    donatePlasma: 'Number of Donate Plasma'
  };
  showPersonalInfo() {
    this.isPersonalInfoVisible = true;
    // console.log("from personal"+this.isPersonalInfoVisible);
  }

  showMedicalInfo() {
    this.isPersonalInfoVisible = false;
    // console.log("from medical"+this.isPersonalInfoVisible);
  }
}
