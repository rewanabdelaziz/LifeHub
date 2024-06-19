import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegisterService } from '../../services/register.service';
import { LoginProfileService } from '../../services/login-profile.service';
import { DatePipe } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-profile',
  // standalone: true,
  // imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe],
})
export class ProfileComponent implements OnInit {
  receivedEmail: string = "";
  isLoggedIn;
  personalEmail: string = "";
  personalPhone: string = "";
  personalNationalId: string = "";
  personalNearestHospital: string = "";
  personalGender: string = "";
  personalLocation: string = "";
  personalBirthDate?: null;
  email=sessionStorage.getItem("Email");
  value = sessionStorage.getItem("Log In") !== null;
  UserName=sessionStorage.getItem("UserName");
  currentLanguage:string='';

  // medical info
  blood_count: string = "";
  plasma_count: string = "";
  sum : string = "";
  bloodType: string = "";
  dateOfDonate?:null;

  constructor(private authService: AuthService,private _: RegisterService,
              private _ProfileServiceService:ProfileService,
              private _LoginProfileServiceService: LoginProfileService,
              private datePipe: DatePipe,
              private languageService: LanguageService ){
    this.isLoggedIn = this.authService.isLoggedIn;
  }
  ngOnInit(): void {

    // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });

    this._LoginProfileServiceService.getData().subscribe(data => {
      this.receivedEmail = data;
    })
    // console.log(this.receivedEmail);
    console.log(this.email)
    if (this.email) {
      this._ProfileServiceService.GetProfileInfo(this.email).subscribe({
        next: (r) => {
          console.log("response of profile info: ",r);
          this.personalBirthDate = r.birthDate;
          this.personalNearestHospital = r.bloodBank;
          this.personalEmail = r.email;
          this.personalLocation=r.city;
          this.personalGender = r.gender;
          this.personalNationalId = r.nationalID;
          this.personalPhone = r.phoneNumber;
          this.personalBirthDate = this.datePipe.transform(this.personalBirthDate, 'yyyy-MM-dd');
          // sessionStorage.setItem("NationalID",this.personalNationalId);
          // this.UserName=r.userName;
          // sessionStorage.setItem("UserName",this.UserName)
        }
      });
      this._ProfileServiceService.GetMedicalInfo(this.email).subscribe({
        next: (r) => {
          console.log("response of medical info: ",r);
          this.blood_count = r.blood_count;
          this.plasma_count = r.plasma_count;
          this.sum = r.sum ;
          this.bloodType = r.bloodType;
          this.dateOfDonate = r.dateOfDonate;
          this.dateOfDonate = this.datePipe.transform(this.dateOfDonate, 'yyyy-MM-dd');
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
  // personalInfo = {
  //   email: 'anyEmail@gmail.com',
  //   phone: '+201111111110',
  //   nationalId: 'YourNationalID',
  //   nearestHospital: 'Nearest Hospital',
  //   gender: 'Gender',
  //   birthdate: '00/00/0000'
  // };

  // medicalInfo = {
  //   bloodType: 'Blood Type',
  //   lastDonate: 'Last Donate',
  //   totalDonate: 'Total Number of Donate',
  //   donateBlood: 'Number of Donate Blood',
  //   donatePlasma: 'Number of Donate Plasma'
  // };



  showPersonalInfo() {
    this.isPersonalInfoVisible = true;
    // console.log("from personal"+this.isPersonalInfoVisible);
  }

  showMedicalInfo() {
    this.isPersonalInfoVisible = false;
    // console.log("from medical"+this.isPersonalInfoVisible);
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    console.log(this.applyArabicClass());
  }
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }
}
