import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LoginProfileService } from 'src/app/services/login-profile.service';
import { RequestDonorService } from 'src/app/services/request-donor.service';
//import { DonationRegesisterService } from 'src/app/services/donation-regesister.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-request-donation',
  // standalone: true,
  // imports: [],
  templateUrl: './request-donation.component.html',
  styleUrls: ['./request-donation.component.css']
})
export class RequestDonationComponent implements OnInit {
  loginSuccess;
  // value = sessionStorage.getItem("token") !== null;
  currentLanguage:string='';
  receivedEmail:string="";
  donationType: string="Blood"; // 'blood' (default) or 'plasma'
  BloodHeader:boolean=true;
  // hospitals: string[] = []; // Array to hold hospital names
  city: string="";
  message: string="";
  errorMessage: string="";
  hospitals: string[] = ['Hospital 1', 'Hospital 2', 'Hospital 3'];
  BloodTypes: string[] =['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  requestDonationForm: FormGroup = this.formBuilder.group({
    hospitalCenter: ['', Validators.required],
    date: ['', Validators.required],
    bloodType: [''],
    plasmaType: ['']
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _LoginProfileService:LoginProfileService,
    private _RequestDonorService:RequestDonorService,
    private datePipe: DatePipe,
    private profileService: ProfileService,
    private languageService: LanguageService )
    {
    this.loginSuccess = this.authService.isLoggedIn;
    }


  ngOnInit(): void {
     // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
    // Initialize form with validators

    // this._LoginProfileService.getData().subscribe(data => {
    //   this.receivedEmail = data;
    // })
    // console.log(this.receivedEmail)
    // // Subscribe to city changes
    // this.profileService.GetProfileInfo(this.receivedEmail).subscribe(city => {
    //   this.city = city;
    //   // Fetch hospitals based on city
    //   // this.fetchHospitals(this.city);
    // });

    // this.donationForm = this.formBuilder.group({
    //   hospitalCenter: [null] // Initialize the form control with a null value
    // });

    // Set the default selected option (placeholder)
    const hospitalCenterControl = this.requestDonationForm.get('hospitalCenter');
  if (hospitalCenterControl) {
    hospitalCenterControl.patchValue(null);
  }
    const BloodTypesControl = this.requestDonationForm.get('bloodType');
  if (BloodTypesControl) {
    BloodTypesControl.patchValue(null);
  }
    const PlasmaTypesControl = this.requestDonationForm.get('plasmaType');
  if (PlasmaTypesControl) {
    PlasmaTypesControl.patchValue(null);
  }

}


  // fetchHospitals(city: string): void {
  //   // Implement logic to fetch hospitals based on city from your DataService
  //   // For demonstration, assuming hospitals are fetched from DataService
  //   this.dataService.getHospitals(city).subscribe(hospitals => {
  //     this.hospitals = hospitals;
  //   });
  // }

  onSubmit(): void {
    if (this.requestDonationForm.invalid) {
      this.markAllFieldsAsTouched(this.requestDonationForm);
      this.errorMessage = 'please fill all fields';
      return; // Exit early if the form is invalid
    }
    const formData = this.requestDonationForm.value;

    console.log(this.requestDonationForm.value)
    console.log(formData)
    // if (!formData.date) {
    //   this.errorMessage = 'Please select a date';
    //   return;
    // }
    // Convert date to ISO 8601 format (YYYY-MM-DD)
    const selectedDate = new Date(formData.date);

    // Check if the selectedDate is invalid
    if (isNaN(selectedDate.getTime())) {
      // Invalid date entered by the user
      this.errorMessage = 'Invalid date. Please select a valid date.';
      return;
    }
    // Convert the date to ISO string format
    formData.date = selectedDate.toISOString().split('T')[0];



    let donationObservable: Observable<string> | null = null;
    if (this.donationType === 'Blood') {
      donationObservable = this._RequestDonorService.requestBlood(formData);
    } else if (this.donationType === 'Plasma') {
      donationObservable = this._RequestDonorService.requestPlasma(formData);
  }
  if (donationObservable) {
    donationObservable.subscribe(
      response => {
        // Handle success response
        console.log(response); // Log the response for demonstration
        if(this.applyArabicClass()){
          this.message = 'تم التسجيل بنجح';
          this.errorMessage = ""; // Reset error message
        }else{
          this.message = 'Donation registered successfully.';
          this.errorMessage = ""; // Reset error message
        }
      },
      error => {
        // Handle error response
        console.log(error);
        if(error.text="Blood Request successfully!"){
          if(this.applyArabicClass()){
            this.message = 'تم التسجيل بنجح';
            this.errorMessage = ""; // Reset error message
          }else{
            this.message = 'Donation registered successfully.';
            this.errorMessage = ""; // Reset error message
          }
        }
        else{
          console.error(error); // Log the error for debugging
          console.error(error.text); // Log the error for debugging
          if(this.applyArabicClass()){
            this.message = "خطأ في التسجيل ! حاول مره أخرى";
            this.errorMessage = ""; // Reset error message
          }else{
            this.errorMessage = 'An error occurred while registering donation. Please try again later.';
          this.message = ""; // Reset success message
          }

        }

      }
    );
  }
}

markAllFieldsAsTouched(formGroup: FormGroup): void {
  // Mark all form controls as touched recursively
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormGroup) {
      this.markAllFieldsAsTouched(control);
    } else {
      control?.markAsTouched();
    }
  });
  }


  requestBlood() {
    this.donationType ="Blood";
    this.BloodHeader=true;
    this.errorMessage = '';
    this.message = "";
    this.requestDonationForm.get('bloodType')?.setValue(null);
    this.requestDonationForm.get('plasmaType')?.setValue(null);
    // console.log("from personal"+this.isPersonalInfoVisible);
  }

  requestPlasma() {
    this.donationType = "Plasma";
    this.BloodHeader=false;
    this.errorMessage = '';
    this.message = "";
    this.requestDonationForm.get('bloodType')?.setValue(null);
    this.requestDonationForm.get('plasmaType')?.setValue(null);
    // console.log("from medical"+this.isPersonalInfoVisible);
  }


  // language
switchLanguage(language: string) {
  this.languageService.setLanguage(language);
  console.log(this.applyArabicClass());
}
applyArabicClass(): boolean {
  return this.currentLanguage === 'ar';
}

}

