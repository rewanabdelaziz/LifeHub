import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from 'src/app/verification-service.service';

@Component({
  selector: 'app-verification-component',
  templateUrl: './verification-component.component.html',
  styleUrls: ['./verification-component.component.css']
})
export class VerificationComponent implements OnInit {
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private verificationService: VerificationService, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];

    this.verificationService.verifyUser(token).subscribe(
      (response: HttpResponse<any>) => { // Specify the type for 'response'
        console.log('Verification successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error: HttpErrorResponse) => { // Specify the type for 'error'
        console.error('Verification error:', error);
        this.errorMessage = 'An error occurred during verification. Please try again later.';
        // You can add more specific error handling based on the error object if needed
      }
    );
  }
}
