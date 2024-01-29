import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from './../../register.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private registerService: RegisterService, private fb: FormBuilder,private router: Router) {
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

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  signup(): void {
    this.signupForm.markAllAsTouched();
    // Check if there are any required input errors
    if (
      this.signupForm.get('email')?.hasError('required') ||
      this.signupForm.get('password')?.hasError('required') ||
      this.signupForm.get('confirmPassword')?.hasError('required') ||
      this.signupForm.get('userName')?.hasError('required') ||
      this.signupForm.get('city')?.hasError('required') ||
      this.signupForm.get('birthDate')?.hasError('required') ||
      this.signupForm.get('gender')?.hasError('required') ||
      this.signupForm.get('phoneNumber')?.hasError('required') ||
      this.signupForm.get('nationalID')?.hasError('required') ||
      this.signupForm.get('BloodBank')?.hasError('required') ||
      false // Add more conditions here if needed
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    if (this.signupForm.get('nationalID')?.hasError('pattern')) {
      this.errorMessage = 'The National ID must be 14 numbers!';
      return;
    }

    // if (this.signupForm.hasError('confirmPassword')) {
    //   this.errorMessage = 'Password and Confirm Password must match.';
    //   return;
    // }

    if (!this.signupForm.get('agreeOnTerms')?.value) {
      this.errorMessage = 'Please agree to the terms and conditions.';
      return;
    }

    if (!this.signupForm.get('notRobot')?.value) {
      this.errorMessage = 'Please confirm that you are not a robot.';
      return;
    }
    if (!this.signupForm.get('donarYes')?.value && !this.signupForm.get('donarNo')?.value) {
      this.errorMessage = 'Please check if you have donor number or No';
      return;
    }

    if (this.signupForm.valid) {
      const user = this.signupForm.value;

      this.registerService.register(user).subscribe(
        (_) => {
          this.errorMessage = 'User registered successfully. Please check your email for a verification link.';
          // this.router.navigate(['/login']);
          this.registerService.setVerificationStatus('unverified');
          this.router.navigate(['/verification-info']);
        },
        (error) => {
          console.error('Registration error:', error);

        if (error.error && error.error.errors) {
          // Handle specific error messages from the API
          const apiErrors = error.error.errors;

          if (apiErrors.Password) {
            this.errorMessage = apiErrors.Password[0];
          } else if (apiErrors.ConfirmPassword) {
            this.errorMessage = apiErrors.ConfirmPassword[0];
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }else if (error.error && error.error === 'User already exists.') {
          this.errorMessage = 'User already exists. Please log in.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
          // Reset form errors after a delay
          // setTimeout(() => {
          //   this.errorMessage = '';
          //   this.signupForm.setErrors(null);
          // }, 5000);
        }
      );
    }
  }
}
