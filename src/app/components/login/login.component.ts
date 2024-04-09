import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Token } from '@angular/compiler';
import { LoginProfileService } from '../../services/login-profile.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({  // Initialize loginForm here
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  errorMessage: string = '';

  EmailData: string = "";



  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
    private registerService: RegisterService,
  private _LoginProfileService: LoginProfileService) { }

  ngOnInit(): void {
     // Check for existing session
    const token = sessionStorage.getItem('Log In');
    if (token) {
       // Optionally, check if the token is still valid
       // If valid, set login state
      this.authService.setLoggedIn(true);
       // Redirect to the home page
      this.router.navigate(['/home']);
    }
  }



  login(): void {
  this.loginForm.markAllAsTouched();

  if (this.loginForm.valid) {
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: async (response) => {
        console.log(response);
        console.log(response.theEmail);
        this.EmailData = response.theEmail;
        sessionStorage.setItem("Log In", "Success");
        sessionStorage.setItem("Email", this.EmailData);
        this.errorMessage = 'Login successful';
        this.authService.setLoggedIn(true);
        console.log("login variable: ",this.authService.isLoggedIn);

        await this.sendDataToComponentB(); // Wait for sendDataToComponentB() to complete

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.error === 'User not found.') {
          this.errorMessage = 'User not found. Please sign up.';
        } else if (error.error === 'Not verified!') {
          this.errorMessage = 'Your account is not verified. Please check your email for verification instructions.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    });
  }
}

sendDataToComponentB() {
  return new Promise<void>((resolve) => {
    const data = this.EmailData;
    this._LoginProfileService.setData(data);
    resolve();
  });
}













  //   login(): void {
  //   this.loginForm.markAllAsTouched();
  //   // console.log('Form valid:', this.loginForm.valid);
  //   if (this.loginForm.valid) {
  //     const credentials = this.loginForm.value;

  //     this.authService.login(credentials).subscribe({
  //      next:(response) => {
  //         console.log(response);
  //         console.log(response.theEmail);
  //         this.EmailData=response.theEmail;
  //         sessionStorage.setItem("token", "SaraToken");
  //         this.errorMessage ='Login successful';
  //         this.authService.setVariable(true);
  //         console.log("login variable: ", this.authService.getVariable());

  //         // var cookieName = "token";
  //         // var cookieValue = document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1");
  //         //  console.log(decodeURIComponent(cookieValue));

  //         this.router.navigate(['/home']);
  //     },
  //      error:(error) => {
  //         console.error('Login error:', error);
  //         if (error.error === 'User not found.') {
  //           this.errorMessage = 'User not found. Please sign up.';
  //         } else if (error.error === 'Not verified!') {
  //           this.errorMessage = 'Your account is not verified. Please check your email for verification instructions.';
  //         } else {
  //           this.errorMessage = 'An error occurred. Please try again.';
  //         }
  //       }
  //     }


  //     );







  //   }
  //   }



  //  sendDataToComponentB() {
  //            const data =  this.EmailData;
  //             this._LoginProfileServiceService.setData(data);
  //         };







}
