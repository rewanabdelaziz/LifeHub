import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegisterService } from '../../services/register.service';
import { LoginProfileService } from '../../services/login-profile.service';


@Component({
  selector: 'app-profile',
  // standalone: true,
  // imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  receivedEmail: string = "";
  isLoggedIn;
  personalEmail: string = "";
  personalPhone: string = "";
  personalNationalId: string = "";
  personalNearestHospital: string = "";
  personalGender: string = "";
  personalBirthDate: string = "";
  email=sessionStorage.getItem("Email");
  value = sessionStorage.getItem("Log In") !== null;
  UserName=sessionStorage.getItem("UserName")
  constructor(private authService: AuthService,private _: RegisterService,
              private _ProfileServiceService:ProfileService,
              private _LoginProfileServiceService: LoginProfileService ){
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  ngOnInit(): void {


    this._LoginProfileServiceService.getData().subscribe(data => {
      this.receivedEmail = data;
    })


    console.log(this.receivedEmail);
    console.log(this.email)
    if (this.email) {
      this._ProfileServiceService.GetProfileInfo(this.email).subscribe({
        next: (r) => {
          console.log(r);
          this.personalBirthDate = r.birthDate;
          this.personalNearestHospital = r.bloodBank;
          this.personalEmail = r.email;
          this.personalGender = r.gender;
          this.personalNationalId = r.nationalID;
          this.personalPhone = r.phoneNumber;
          // this.UserName=r.userName;
          // sessionStorage.setItem("UserName",this.UserName)
        }
      });
    } else {
      console.error("Email is null");
    }




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
