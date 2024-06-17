import { VerificationService } from './../../services/verification.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  sendingVerificationCode: boolean = false;
  validationErrors: any[] = [];
  currentLanguage:string='';

  constructor(
    private registerService: RegisterService,
    private verificationService: VerificationService,
    private fb: FormBuilder,private router: Router,
    private ngZone: NgZone,
    private languageService: LanguageService,
    ) {
    this.signupForm = this.fb.group({
      donorNumber: this.fb.group({
        hasDonorNumber: [false],
        donorNumberValue: ['']
      }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      nationalID: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      BloodBank: ['', Validators.required],
      agreeOnTerms: [false],
      notRobot: [false],
      donarYes:[false],
      donarNo:[false]
    });
  }
  ngOnInit(): void {
    // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  signup(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.signupForm.get('nationalID')?.hasError('pattern')) {
      this.errorMessage = 'The National ID must be 14 numbers!';
      return;
    }

    if (!this.signupForm.get('agreeOnTerms')?.value) {
      this.errorMessage = 'Please agree to the terms and conditions.';
      return;
    }

    if (!this.signupForm.get('notRobot')?.value) {
      this.errorMessage = 'Please confirm that you are not a robot.';
      return;
    }

    if (!this.signupForm.get('donarYes')?.value && !this.signupForm.get('donarNo')?.value) {
      this.errorMessage = 'Please check if you have a donor number or not.';
      return;
    }
    if (!this.signupForm.get('phoneNumber')?.value) {
      this.errorMessage = 'Phone number is required.';
      return;
    }


    const user = this.signupForm.value;

    if (!user.email) {
      this.errorMessage = 'Please provide an email address.';
      return;
    }
    // Trigger validation for the email field
    this.signupForm.get('email')?.markAsTouched();

    // Check if the email field has a valid email format
    if (this.signupForm.get('email')?.invalid) {
      this.errorMessage = 'Please provide a valid email address.';
      return;
    }

    this.registerService.register(user).subscribe(
      (_) => {
        const email = this.signupForm.get('email')?.value;
        console.log('Email value before calling sendVerificationCode:', email);
        this.sendVerificationCode(email);
        this.errorMessage = 'User registered successfully. Please check your email for a verification link.';
        this.registerService.setVerificationStatus('unverified');
        this.router.navigate(['/verification', { email: email }]);
      },
      (error) => {
        console.error('Registration error:', error);
        console.log("user",user);
        if (error.error && error.error.errors) {
          const apiErrors = error.error.errors;

          if (apiErrors.PhoneNumber) {
            this.errorMessage = apiErrors.PhoneNumber[0];
          } else if (apiErrors.Password) {
            this.errorMessage = apiErrors.Password[0];
          } else if (apiErrors.ConfirmPassword) {
            this.errorMessage = apiErrors.ConfirmPassword[0];
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        } else if (error.error && error.error === 'User already exists.') {
          this.errorMessage = 'User already exists. Please log in.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    );
  }


  sendVerificationCode(email: string): void {
      // console.log('Inside sendVerificationCode method.');
      // console.log('Entering sendVerificationCode with email:', email);
      if (!email) {
        console.error('Email address is missing.');
        return;
      }
      // console.log('Email is present, proceeding with verification code send.');
      this.verificationService.sendVerificationCode(email).subscribe(
        (_) => {
          console.log('New verification code sent successfully.');
        },
        (error:any) => {
          if ( error.emailValidationErrors) {
            this.validationErrors = error.emailValidationErrors;
            // console.log("email: ",email);
            // console.log('Validation errors:', this.validationErrors);

          }
          else {
            console.error('Error sending verification code:', error);
          }
        }
      );
      // console.log('After sendVerificationCode method');


  }
  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    console.log(this.applyArabicClass());
  }
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }
}
