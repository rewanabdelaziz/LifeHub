import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { BloodFiltrationService } from 'src/app/services/blood-filtration.service';
import { BloodTestsService } from 'src/app/services/blood-tests.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{







  message: string="";
  errorMessage: string = "";

  num1: Boolean = false;
  num2: Boolean = false;
  num3: Boolean = false;
  num4: Boolean = false;
  num5: Boolean = false;

  // loginSuccess: Boolean = false;


  value = sessionStorage.getItem("Log In") !== null;



  washedRbcsForm!: FormGroup;

  bloodFiltrationForm!: FormGroup;
  bloodTestsForm!: FormGroup;


  selectedFile: File | null = null;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private zone: NgZone, private bloodFiltrationService: BloodFiltrationService,private _BloodTestsService:BloodTestsService) {



  }


  ngOnInit() {
    this.washedRbcsForm = this.formBuilder.group({
      hospitalCenter: ['', Validators.required], // 'hospitalCenter', not 'hospital'
      date: [''],
      bloodType: [''],
      hasBloodBag: [false],
      // hasNoBloodBag: [false]
    });



    this.bloodFiltrationForm = this.formBuilder.group({
    hospitalCenter: ['', Validators.required],
    bloodType: ['', Validators.required],
    testType: ['', Validators.required],
    date: ['', Validators.required],
    nationalId: ['', Validators.required],
    ImageFile: [null] // Ensure this control is required
    });


    this.bloodTestsForm=this.formBuilder.group({
     hospitalCenter: ['', Validators.required],
     typeOfTest: ['' , Validators.required],
     date: ['' , Validators.required],
      bloodType: ['' , Validators.required],
      nationalId: ['' , Validators.required],
      ImageFile: [null] // Ensure this control is required
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
    this.http.post<any>('https://localhost:7003/api/User/WashedRbcs/Washed_Rbcs', formData).subscribe(
      (response) => {
        console.log('Response', response);
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



onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }






  submitForm2() {


    if (!this.selectedFile) {
      this.zone.run(() => {
          this.errorMessage = 'There Is No image Selected';
          this.message = '';
        });

        // Automatically clear the error message after 2 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 2000);
      return;
    }

    if (this.bloodFiltrationForm.valid) {
      const formData = new FormData();
formData.append('hospitalCenter', this.bloodFiltrationForm.get('hospitalCenter')!.value);
formData.append('bloodType', this.bloodFiltrationForm.get('bloodType')!.value);
formData.append('testType', this.bloodFiltrationForm.get('testType')!.value);
formData.append('date', this.bloodFiltrationForm.get('date')!.value);
formData.append('nationalId', this.bloodFiltrationForm.get('nationalId')!.value);
formData.append('ImageFile', this.selectedFile);


      this.bloodFiltrationService.submitForm(formData)
        .subscribe(
    (response) => {
            console.log('Response:', response);
            this.zone.run(() => {
          this.message = 'Filteration Register Is Done';
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


    if (!this.selectedFile) {
      this.zone.run(() => {
          this.errorMessage = 'There Is No image Selected';
          this.message = '';
        });

        // Automatically clear the error message after 2 seconds (1 minute)
        setTimeout(() => {
          this.zone.run(() => {
            this.errorMessage = '';
          });
        }, 2000);
      return;
    }

    if (this.bloodTestsForm.valid) {
      const formData = new FormData();
    formData.append('hospitalCenter', this.bloodTestsForm.get('hospitalCenter')!.value);
    formData.append('typeOfTest', this.bloodTestsForm.get('typeOfTest')!.value);
    formData.append('date', this.bloodTestsForm.get('date')!.value);
    formData.append('bloodType', this.bloodTestsForm.get('bloodType')!.value);
    formData.append('nationalId', this.bloodTestsForm.get('nationalId')!.value);
    formData.append('ImageFile', this.selectedFile);




      this._BloodTestsService.submitForm(formData)
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













  showService1() {
    this.num1 = true;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
  }
  showService2() {
    this.num1 = false;
    this.num2 = true;
    this.num3 = false;
    this.num4 = false;
    this.num5 = false;
  }
  showService3() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = true;
    this.num4 = false;
    this.num5 = false;
  }
  showService4() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = true;
    this.num5 = false;
  }
  showService5() {
    this.num1 = false;
    this.num2 = false;
    this.num3 = false;
    this.num4 = false;
    this.num5 = true;
  }








}
