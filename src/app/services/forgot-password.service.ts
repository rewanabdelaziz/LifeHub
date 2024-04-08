import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private _HttpClient: HttpClient ,
              private router:Router) {
  }

    ForgotPassword(userEmail:object): Observable < any > {
      return this._HttpClient.post(`https://localhost:7003/api/User/ForgotPassword/forgot-password?email=${userEmail}`,userEmail )
  }


  apiUrl = 'https://localhost:7105/api/Users/ResetPassword/reset-password';
  resetPassword(token: string, newPassword: string): Observable<any> {
    const body = {
      token: token,
      password: newPassword
    };

    return this._HttpClient.post(this.apiUrl, body).pipe(
      map((response: any) => {
        if (response.success) {
          return response; // Return the successful response
        } else if (response.validationErrors) {
          throw { validationErrors: response.validationErrors };
        } else {
          // If it's not a JSON response, assume success with a string message
          return response.message || 'Password reset was successful.';
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          throw { message: 'Network error. Please check your internet connection.' };
        }

        throw error.error || { message: 'An unexpected error occurred during password reset.' };
      })
    );
  }
  // resetPassword(token: string, newPassword: string): Observable<any> {
  //   const body = {
  //     token: token,
  //     password: newPassword
  //   };

  //   return this._HttpClient.post(this.apiUrl, body).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Reset password error:', error);

  //       if (error.status === 400 && error.error && error.error.errors && error.error.errors.Password) {
  //         // Handle password validation error
  //         const passwordValidationError = error.error.errors.Password[0];
  //         console.log('Password validation error:', passwordValidationError);
  //         // You can display a user-friendly message or handle it as per your application logic
  //         return throwError(passwordValidationError);
  //       }

  //       // For other errors, you can handle them based on your needs
  //       return throwError('An error occurred during password reset.');
  //     })
  //   );
  // }

  // resetPassword(token: string, newPassword: string): Observable<any> {
  //   const body = {
  //     token: token,
  //     password: newPassword
  //   };

  //   return this._HttpClient.post(this.apiUrl, body, { responseType: 'text' as 'json' }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Reset password error:', error);

  //       if (error.status === 200 && error.headers.get('content-type')?.includes('application/json')) {
  //         // The response is not a JSON object, return it as plain text
  //         return of({ text: 'Password successfully reset.' });
  //       }

  //       if (error.status === 400 && error.error === 'Invalid Token.') {
  //         // Handle specific "Invalid Token" error
  //         console.log('Invalid Token.');
  //         return throwError('Invalid Token.');
  //       } else if (error.status === 400 && error.error.errors) {
  //         // Handle specific validation errors
  //         const validationErrors = error.error.errors;

  //         if (validationErrors && validationErrors.code) {
  //           // Handle code validation error
  //           console.log('Code validation error:', validationErrors.code[0]);
  //           return throwError(validationErrors.code[0]);
  //         }

  //         if (validationErrors && validationErrors.Password) {
  //           // Handle newPassword validation error
  //           console.log('NewPassword validation error:', validationErrors.Password[0]);
  //           return throwError(validationErrors.Password[0]);
  //         }

  //         // You can handle other validation errors here based on your API response structure
  //         return throwError('An error occurred during password reset.');
  //       } else {
  //         // Handle other error cases
  //         console.error('Unhandled error:', error);
  //         return throwError('An error occurred during password reset.');
  //       }
  //     })
  //   );
  // }

}
