import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { LanguageService } from 'src/app/services/language.service';
import { VerificationService } from 'src/app/services/verification.service';


@Component({
  selector: 'app-forgetting-password',
  templateUrl: './forgetting-password.component.html',
  styleUrls: ["./forgetting-password.component.css"],
  standalone: false,


})
export class ForgettingPasswordComponent  {

  constructor(private _ForgotPasswordService:ForgotPasswordService ,
              private _Router:Router,
              private fb:FormBuilder,
              private languageService: LanguageService) {


  }

  currentLanguage:string='';
  step1: boolean = true;
  step2: boolean = false;
  // step3: boolean = false;
  email: string = '';
  resetError:string='';

  forgotForm: FormGroup = new FormGroup({
    email:new FormControl('')
  });

  resetPasswordForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    newPassword: ['', Validators.required]
  });

  forgotPassword(): void{
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;
    // let x=userEmail.email;
    // console.log(this.email);
    // console.log("x",x);

    this._ForgotPasswordService.ForgotPassword(userEmail.email).subscribe({
      next:(response)=>{
        this.step1 = false;
        this.step2 = true;
      }
    })

}
resetCode(): void {
  if (this.resetPasswordForm.valid) {
    const code = this.resetPasswordForm.get('code')?.value;
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;

    this._ForgotPasswordService.resetPassword(code, newPassword).subscribe(
      (response: any) => {
        console.log('Password reset response:', response);
        if (typeof response === 'string') {
          console.log('Password reset successfully.');
          this.resetError = ''; // Clear any previous error
          this._Router.navigate(['/login']);
        } else {
          // Handle the case where the response is not valid JSON
          console.error('Invalid JSON response:', response);
          this.resetError = 'Password reset was successful, but an error occurred in processing the response.';
        }
      },
      (error: any) => {
        console.error('Reset password error:', error);

        if (error.text == "Password successfully reset."){
          console.log('Password reset successfully.');
          this.resetError = ''; // Clear any previous error
          this._Router.navigate(['/login']);
        }else if (error.errors) {
          // Handle validation errors
          console.error('Validation errors:', error.errors);
          const firstValidationErrorKey = Object.keys(error.errors)[0];
          this.resetError = error.errors[firstValidationErrorKey][0];
        } else if (error === 'Invalid Token.') {
          console.error('Validation errors:', error.errors);
          this.resetError = 'The provided token is invalid or has expired.';
        } else {
          // Handle other errors
          this.resetError =  'An error occurred. Please try again.';
        }
      }
    );
  } else {
    // Handle the case where the form is invalid
    this.resetError = "Token field and new Password field are required";
  }
}

goToLogin():void{
  this._Router.navigate(['/login']);
}

ngOnInit(): void {
  // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
}

switchLanguage(language: string) {
  this.languageService.setLanguage(language);
  console.log(this.applyArabicClass());
}
applyArabicClass(): boolean {
  return this.currentLanguage === 'ar';
}
}


