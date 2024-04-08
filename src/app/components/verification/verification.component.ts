import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from 'src/app/services/verification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  errorMessage: string = '';
  email: string = '';
  token: string='';
  resendverificationCodeSentMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private verificationService: VerificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form and its controls
    this.verificationForm = this.fb.group({
      token: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Retrieve email from the route parameters
    this.email = this.route.snapshot.params['email'];
  }




  public enterTokenVerify(): void {
    const token = this.verificationForm.get('token')?.value;

    if (!token) {
      console.error('Token is required.');
      this.verificationForm.markAllAsTouched();
      return;
    }

    this.verificationService.enterTokenVerify(token).subscribe(
      (_) => {
        console.log('User verified successfully.');
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error verifying user:', error);

        switch (error.error) {
          case 'User already verified.':
            this.router.navigate(['/login']);
            break;
          default:
            console.error('Unhandled error:', error);
            break;
        }
      }
    );
  }



  public resendVerificationCode(): void {
    // Call the service to resend verification code
    this.verificationService.resendVerificationCode(this.email).subscribe(
      (response: any) => {
        // Handle successful resend
        console.log(response);
        // Check if the response is a string
        if (typeof response === 'string') {

          this.resendverificationCodeSentMessage= 'New verification code sent successfully.';

        }
        //  else {
        //   // Handle other types of responses if needed
        // }
      },
      (error: HttpErrorResponse) => {
        // Handle errors
        if (error.status === 200) {
          this.resendverificationCodeSentMessage =  error.error.text;
        } else {
          console.error('Error resending verification code:', error);
        }
      }
    );
  }
}
