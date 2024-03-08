import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private _HttpClient: HttpClient , private router:Router) {
  }

    ForgotPassword(userEmail:object): Observable < any > {
      return this._HttpClient.post(`https://localhost:7105/api/Users/ForgotPassword/forgot-password?email=${userEmail}`,userEmail )
  }

  //   resetCode(code:object): Observable < any > {
  //     return this._HttpClient.post(`https://localhost:7105/api/User/ResendVerificationCode/resend-code?email=${code} `, code)
  // }










  apiUrl = 'https://localhost:7105/api/Users';
  enterTokenVerify(token: string): Observable<any> {
    const url = `${this.apiUrl}/Tokenverify/enter_token_verify?token=${token}`;
    return this._HttpClient.post(url, null, { responseType: 'text' }).pipe(
      map((response: string) => {
        // Assuming your response is a plain text message
        const trimmedResponse = response.trim();
        console.log(response);



        if (trimmedResponse === 'User verified.') {
          console.log('User verified successfully.');
          // this.router.navigate(['/login']);
          // Return a success message if needed
          return 'User verified successfully.';
        } else if (trimmedResponse === 'User already verified.') {
          console.log('User already verified.');
          this.router.navigate(['/login']);
          // Return a success message if needed
          return 'User already verified.';
        } else {
          // If the response is neither 'User verified.' nor 'User already verified.'
          console.error('Unexpected response:', trimmedResponse);
          return throwError('An error occurred while processing the response.');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // If there's any error during the request or response processing
        console.error('Error during token verification:', error);

        if (error.status === 400 && error.error === 'User already verified.') {
          console.log('User already verified.');
          this.router.navigate(['/login']);
          return throwError('User already verified.');
        } else {
          return throwError('An error occurred while processing the response.');
        }
      })
    );
  }









    resetNewPass(newPass:object): Observable < any > {
      return this._HttpClient.post(`https://localhost:7105/api/User/ResetPassword/reset-password`,newPass)
    }
}

