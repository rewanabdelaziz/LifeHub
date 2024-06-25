import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs';
import { BloodFiltrationService } from 'src/app/services/blood-filtration.service';
import { BloodTestsService } from 'src/app/services/blood-tests.service';
import { LanguageService } from 'src/app/services/language.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ProfileService } from 'src/app/services/profile.service';
interface Hospital {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  latitude: number;
  longitude: number;
  city: string;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  currentLanguage:string='';

  message: string="";
  errorMessage: string = "";
  num1: Boolean = false;
  num2: Boolean = false;
  num3: Boolean = false;
  num4: Boolean = false;
  num5: Boolean = false;

  // loginSuccess: Boolean = false;

  hospitals: Hospital[] = [];
  error: string | null = null;
  loading: boolean = true; // Loading state
  userCity:string='';
  value = sessionStorage.getItem("Log In") !== null;

  email=sessionStorage.getItem("Email");
  personalNationalId :string="";
  washedRbcsForm!: FormGroup;
  donationForm!: FormGroup;
  bloodFiltrationForm!: FormGroup;
  bloodTestsForm!: FormGroup;
  donationC=false;

  selectedFile: File | null = null;


  constructor(private formBuilder: FormBuilder,
              private http: HttpClient, private zone: NgZone,
              private bloodFiltrationService: BloodFiltrationService,
              private _BloodTestsService:BloodTestsService,
              private languageService: LanguageService,
              private profileService: ProfileService,
              private geolocationService: GeolocationService,) {

                this.languageService.currentLanguage$.subscribe(language => {
                  this.currentLanguage = language;
                  if (this.userCity) {
                    this.fetchHospitals();
                  }
                });

  }


  ngOnInit(): void  {
    if (this.email) {
      this.profileService.GetProfileInfo(this.email).subscribe({
        next: (r) => {
          console.log("response of profile info: ",r);
          this.personalNationalId = r.nationalID;
          this.userCity=r.city;
          console.log(this.userCity);
          this.fetchHospitals();
        }
      });
    } else {
      console.error("Email is null");
    }
    // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
    this.washedRbcsForm = this.formBuilder.group({
      hospitalCenter: ['', Validators.required], // 'hospitalCenter', not 'hospital'
      date: [''],
      bloodType: [''],
      hasBloodBag: [false],
      // hasNoBloodBag: [false]
    });

    this.donationForm = this.formBuilder.group({
      healthStatus: [false, Validators.required],
      bloodDonation: [false, Validators.required],
      healthProblems: [false, Validators.required],
      medications: [false, Validators.required],
      vaccinations: [false, Validators.required],
      recentTravel: [false, Validators.required],
      surgeries: [false, Validators.required],
      hepatitisExposure: [false, Validators.required],
      bloodTransfusion: [false, Validators.required],
      covidExposure: [false, Validators.required],
      pregnancyStatus: [false,Validators.required],
      chronicDiseases: [false, Validators.required],
      regularDonation: [false, Validators.required],
      aspirinIntake: [false, Validators.required],
      heavyMeals: [false, Validators.required]
    });





    this.bloodFiltrationForm = this.formBuilder.group({
    hospitalCenter: ['', Validators.required],
    bloodType: ['', Validators.required],
    testType: ['', Validators.required],
    date: ['', Validators.required],
    nationalId: ['', ],
    // ImageFile: [null] // Ensure this control is required
    });


    this.bloodTestsForm=this.formBuilder.group({
      hospitalCenter: ['', Validators.required],
      typeOfTest: ['' , Validators.required],
      date: ['' , Validators.required],
      bloodType: ['' , Validators.required],
      nationalId: ['' , ],
      // ImageFile: [null] // Ensure this control is required
    });



}


submitForm() {
    const hospitalControl = this.washedRbcsForm.get('hospitalCenter');

  // Check if the form control exists and is valid
  if (hospitalControl && hospitalControl.valid) {
    // Access the value property safely
    const hospitalValue = hospitalControl.value;
    // Proceed with form submission
    const formData = {
      hospitalCenter: hospitalValue,
      date: this.washedRbcsForm.get('date')!.value,
      bloodType: this.washedRbcsForm.get('bloodType')!.value,
      hasBloodBag: this.washedRbcsForm.get('hasBloodBag')!.value,
      // hasNoBloodBag: this.washedRbcsForm.get('hasNoBloodBag')!.value
    };

    // Send formData to your API using HttpClient
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('https://localhost:7105/api/Users/WashedRbcs/Washed_Rbcs', formData,{ headers, responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        try {
          const jsonResponse = JSON.parse(response);
          return jsonResponse;
        } catch (jsonError) {
          return response;
        }
      }),
    ).subscribe(
      (response) => {
        console.log('Response', response as JSON);
        this.zone.run(() => {
          this.message = 'Registering Washed RBCS Is Done';
          this.errorMessage = '';
        });

        // Automatically clear the message after 60 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.message = '';
          });
        }, 2000);
        // Handle response as needed


    //     setTimeout(() => {
    //   this.message = '';
    // }, 2000); // 2 seconds

    // Show errorMessage div for 2 seconds
    // setTimeout(() => {
    //   this.errorMessage = '';
    // }, 2000);
      },
      (error) => {
        console.error('Error', error);
        // Handle error as needed
      }
    );
  } else {
    console.error('Hospital control is null or invalid');
    this.zone.run(() => {
          this.errorMessage = 'An error occurred while registering Washed RBCS. Please try again later.';
          this.message = '';
        });

        // Automatically clear the error message after 2 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 2000);
  }
  }



// onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }






  submitForm2() {


    // if (!this.selectedFile) {
    //   this.zone.run(() => {
    //       this.errorMessage = 'There Is No image Selected';
    //       this.message = '';
    //     });

    //     // Automatically clear the error message after 2 seconds (1 minute)
    //     setTimeout(() => {
    //       this.zone.run(() => {
    //         this.errorMessage = '';
    //       });
    //     }, 2000);
    //   return;
    // }
// console.log("form before:",this.bloodFiltrationForm.value);
this.bloodFiltrationForm.value.nationalId=this.personalNationalId;
    if (this.bloodFiltrationForm.valid) {
//       const formData = new FormData();
// formData.append('hospitalCenter', this.bloodFiltrationForm.get('hospitalCenter')!.value);
// formData.append('bloodType', this.bloodFiltrationForm.get('bloodType')!.value);
// formData.append('testType', this.bloodFiltrationForm.get('testType')!.value);
// formData.append('date', this.bloodFiltrationForm.get('date')!.value);
// formData.append('nationalId', this.bloodFiltrationForm.get('nationalId')!.value);
// formData.append('ImageFile', this.selectedFile);
// const formData = {
//   hospitalCenter: this.bloodFiltrationForm.get('hospitalCenter')!.value,
//   bloodType: this.bloodFiltrationForm.get('bloodType')!.value,
//   testType: this.bloodFiltrationForm.get('testType')!.value,
//   date: this.bloodFiltrationForm.get('date')!.value,
//   nationalId: this.bloodFiltrationForm.get('nationalId')!.value,
//   // hasNoBloodBag: this.washedRbcsForm.get('hasNoBloodBag')!.value
// };

      this.bloodFiltrationService.submitForm(this.bloodFiltrationForm.value)
        .subscribe(
    (response) => {
            console.log('Response:', response);
            this.zone.run(() => {
              if(response=="An entry with the same NationalId already exists."){
                this.message = 'you recorded before with same nationalID';
                this.errorMessage = '';
              }else{
                this.message = 'Filteration Register Is Done';
                this.errorMessage = '';
              }

        });

        // Automatically clear the message after 60 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.message = '';
          });
        }, 2000);
      // Handle the plain text response here
          },
          (error) => {
            if(error.error=="An entry with the same NationalId already exists."){
              this.errorMessage = 'you recorded before with same nationalID';
              this.message = '';
            }else{
              console.error('API Error:', error);
            }



          // Handle error response
        });
    } else {


      this.zone.run(() => {

          this.errorMessage = 'An error occurred while registering in Blood Filtration. Please try again.';
          this.message = '';
        });

        // Automatically clear the error message after 2 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 2000);
      // Form is invalid, handle error or display error message
    }
  }


  submitForm3() {

    // console.log("form before:",this.bloodTestsForm.value);
    // if (!this.selectedFile) {
    //   this.zone.run(() => {
    //       this.errorMessage = 'There Is No image Selected';
    //       this.message = '';
    //     });

    //     // Automatically clear the error message after 2 seconds (1 minute)
    //     setTimeout(() => {
    //       this.zone.run(() => {
    //         this.errorMessage = '';
    //       });
    //     }, 2000);
    //   return;
    // }
    this.bloodTestsForm.value.nationalId=this.personalNationalId;
    if (this.bloodTestsForm.valid) {
    //   const formData = new FormData();
    // formData.append('hospitalCenter', this.bloodTestsForm.get('hospitalCenter')!.value);
    // formData.append('typeOfTest', this.bloodTestsForm.get('typeOfTest')!.value);
    // formData.append('date', this.bloodTestsForm.get('date')!.value);
    // formData.append('bloodType', this.bloodTestsForm.get('bloodType')!.value);
    // formData.append('nationalId', this.bloodTestsForm.get('nationalId')!.value);
    // // formData.append('ImageFile', this.selectedFile);

    // console.error('data:', formData);
    console.error('testdata:', this.bloodTestsForm);



      this._BloodTestsService.submitForm(this.bloodTestsForm.value)
        .pipe(
        finalize(() => {
          // Reset the form and selected file after submission
          this.bloodTestsForm.reset();
          this.selectedFile = null;
        })
      )
        .subscribe(
    (response) => {
            console.log('Response:', response);
            this.zone.run(() => {
          this.message = 'Tests Register Is Done';
          this.errorMessage = '';
        });

        // Automatically clear the message after 60 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.message = '';
          });
        }, 2000);
      // Handle the plain text response here
          },
          (error) => {
            console.error('API Error:', error);
            // console.error('data:', formData);

          // Handle error response
        });
    } else {


      this.zone.run(() => {
          this.errorMessage = 'An error occurred while registering in Blood Tests. Please try again.';
          this.message = '';
        });

        // Automatically clear the error message after 2 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 2000);
      // Form is invalid, handle error or display error message
    }
  }





  onSubmit(): void {
    if (this.donationForm.invalid) {
      console.log(this.donationForm.value);
      if(this.applyArabicClass()){
        this.errorMessage='من فضلك تأكد من ادخال كل الحقول'
      }else{
        this.errorMessage = 'please fill all fields';
      }
      return; // Exit early if the form is invalid
    }
    if (this.donationForm.valid) {
      console.log(this.donationForm.value);
      this.showService6()
      // sessionStorage.setItem('DonationForm','True');
    }

  }







  showService1() {
    this.num1 = true;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
    this.donationC=false;
  }
  showService2() {
    this.num1 = false;
    this.num2 = true;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
    this.donationC=false;
  }
  showService3() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = true;
    this.num4 = false;
    this.num5 = false;
    this.donationC=false;
  }
  showService4() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = true;
    this.num5 = false;
    this.donationC=false;
  }
  showService5() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = true;
    this.donationC=false;
  }
  showService6() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
    this.donationC=true;
    console.log("donationC: ",this.donationC)
  }



  switchLanguage(language: 'en' | 'ar') {
    this.currentLanguage = language;
  }

  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }

  // nearest hospital
  fetchHospitals(): void {
    console.log(this.userCity);
    if (this.userCity) {
      this.geolocationService.getHospitalsByCity(this.userCity, this.currentLanguage as 'en' | 'ar')
        .subscribe(
          data => {
            console.log(this.userCity);
            this.hospitals = data;
            console.log(this.hospitals);
            this.loading = false; // Data is loaded
          },
          error => {
            this.errorMessage = error.message;
            this.loading = false; // Error occurred, stop loading
          }
        );
    } else {
      if(this.currentLanguage=='ar'){
        this.errorMessage = 'موقعك غير متوفر حاول مره أخرى';
        this.loading = false;
      }else{
        this.errorMessage = 'your city not available.';
        this.loading = false;
      }

    }
  }




}
