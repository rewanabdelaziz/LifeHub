import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
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

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private registerService: RegisterService) {}

  ngOnInit(): void {

  }

  login(): void {
    this.loginForm.markAllAsTouched();
    // console.log('Form valid:', this.loginForm.valid);
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe(
        (_) => {
          this.errorMessage ='Login successful';
          this.authService.setVariable(true);
          console.log("login variable: ",this.authService.getVariable());
          this.router.navigate(['/home']);
      },
        (error) => {
          console.error('Login error:', error);
          if (error.error === 'User not found.') {
            this.errorMessage = 'User not found. Please sign up.';
          } else if (error.error === 'Not verified!') {
            this.errorMessage = 'Your account is not verified. Please check your email for verification instructions.';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
        }
      );
    }
  }
}
