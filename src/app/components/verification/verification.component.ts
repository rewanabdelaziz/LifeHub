import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  errorMessage: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.verificationForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Retrieve email from the route parameters
    this.email = this.route.snapshot.params['email'];
  }

  onSubmit(): void {
    const token = this.verificationForm.get('token')?.value;

    // Call the verification service
    this.verificationService.verifyUser(token).subscribe(
      (response) => {
        console.log('Verification successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        console.error('Verification error:', error);
        this.errorMessage = 'An error occurred during verification. Please try again later.';
        // You can add more specific error handling based on the error object if needed
      }
    );
  }

  resendCode(): void {
    // Call the service to resend verification code
    this.verificationService.resendVerificationCode(this.email).subscribe(
      (response) => {
        console.log('Resend successful:', response);
        // You can provide feedback to the user that the code has been resent
      },
      (error) => {
        console.error('Resend error:', error);
        // Handle the error, e.g., display a message to the user
      }
    );
  }
}
