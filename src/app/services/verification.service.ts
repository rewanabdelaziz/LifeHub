import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,of, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface CustomError {
  // properties
  emailValidationErrors?: string[];

}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  apiUrl = 'https://localhost:7105/api/Users';

  constructor(private http: HttpClient, private router: Router) {}



  sendVerificationCode(email: string): Observable<any> {
    // console.log('Sending verification code for email:', email);


    const url = `${this.apiUrl}/Verify/send_verify_token?email=${encodeURIComponent(email)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Set responseType to 'text' to prevent JSON parsing
    const options = { headers, responseType: 'text' as 'json' ,withCredentials: true};
    const body = { email };

    console.log('Request body:', body);
    return this.http.post(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Verification error:', error);

    const customError: CustomError = {};

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else if (error.error && typeof error.error === 'string') {
      // Try to parse the error body if it's a string
      try {
        const errorBody = JSON.parse(error.error);
        if (errorBody.errors && errorBody.errors.email) {
          customError.emailValidationErrors = errorBody.errors.email;
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
      }
    }

    return throwError(customError);
  }
  enterTokenVerify(token: string): Observable<any> {
    const url = `${this.apiUrl}/Tokenverify/enter_token_verify?token=${token}`;
    return this.http.post(url, null, { responseType: 'text' }).pipe(
      map((response: string) => {
        try {
          // Assuming your response is a plain text message
          const parsedResponse = JSON.parse(response);
          // Handle the parsed response here, if needed

          // If parsing is successful, you can navigate to the login page
          this.router.navigate(['/login']);

          // Return the parsed response if needed
          return parsedResponse;
        } catch (error) {
          // If parsing fails, handle the error here
          console.error('Error parsing response:', error);
          return throwError('An error occurred while processing the response.');
        }
      }),
      catchError(error => {
        // If there's a parsing error or any other error, handle it here
        console.error('Error parsing response:', error);
        return throwError('An error occurred while processing the response.');
      })
    );
  }
  // public enterTokenVerify(token: string): Observable<any> {
  //   const url = `${this.apiUrl}/Tokenverify/enter_token_verify?token=${encodeURIComponent(token)}`;
  //   return this.http.get(url, { observe: 'response' }) // observe the full response
  //     .pipe(
  //       catchError((errorResponse: HttpErrorResponse) => this.handleTokenError(errorResponse))
  //     );
  // }
  // private handleTokenError(errorResponse: HttpErrorResponse): Observable<never> {
  //   console.error('Unexpected error occurred during token verification:', errorResponse);

  //   let errorMessage = 'Unknown error occurred';

  //   if (errorResponse.error instanceof ErrorEvent) {
  //     errorMessage = `Error: ${errorResponse.error.message}`;
  //   } else {
  //     // Log the complete error response for inspection
  //     console.error('Complete error response:', errorResponse);

  //     // Check if the content type is text/plain
  //     const contentType = errorResponse.headers.get('Content-Type');
  //     if (contentType && contentType.toLowerCase().includes('text/plain')) {
  //       errorMessage = errorResponse.error;

  //       if (errorMessage.includes('User already verified')) {
  //         // Navigate to the login page if the user is already verified
  //         this.router.navigate(['/login']);
  //       }
  //     } else {
  //       errorMessage = 'Unexpected error occurred';
  //     }
  //   }

  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }

  resendVerificationCode(email: string): Observable<any> {
    // console.log('Sending verification code for email:', email);
    const url = `${this.apiUrl}/ResendVerificationCode/resend-code?email=${encodeURIComponent(email)}`;
    return this.http.post(url, { email });
  }
}













// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { HttpResponseBase } from '@angular/common/http';

// interface CustomError {
//   emailValidationErrors?: string[];
//   // Add other properties if needed
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class VerificationService {

//   private apiUrl = 'https://localhost:7105/api/Users';


//   constructor(private http: HttpClient) {}

//   sendVerificationCode(email: string): Observable<any> {
//     const url = `${this.apiUrl}/Verify/send_verify_token`;
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//     // Set responseType to 'text' to prevent JSON parsing
//     const options = { headers, responseType: 'text' as 'json' };
//     const body = { email };
//     // return this.http.post(url, body, options).pipe(
//     //   catchError(this.handleError)
//     // );
//     return this.http.post(url, body, options).pipe(
//       catchError((error: HttpResponseBase) => {
//         const customError: CustomError = {};

//         if (error && error.status === 400) {
//           try {
//             const errorBody = JSON.parse(error.error);

//             if (errorBody.errors && errorBody.errors.email) {
//               customError.emailValidationErrors = errorBody.errors.email;
//             }
//           } catch (parseError) {
//             console.error('Error parsing error response:', parseError);
//           }
//         }

//         return throwError(customError);
//       })
//     );
//   }


//   // private handleError(error: HttpErrorResponse): Observable<never> {
//   //   console.error('Verification error:', error);

//   //   const customError: CustomError = {};
//   //   // if (error.error && error.error.errors && error.error.errors.email) {
//   //   //   // If there are specific email validation errors, propagate them
//   //   //   customError.emailValidationErrors = error.error.errors.email;
//   //   // }

//   //   // // If no specific errors found, propagate the general error
//   //   // return throwError(customError);
//   //   try {
//   //     const errorBody = JSON.parse(error.error);
//   //     if (errorBody.errors && errorBody.errors.email) {
//   //       customError.emailValidationErrors = errorBody.errors.email;
//   //     }
//   //   } catch (parseError) {
//   //     console.error('Error parsing error response:', parseError);
//   //   }

//   //   return throwError(customError);
//   // }




//   enterTokenVerify(token: string): Observable<any> {
//     const url = `${this.apiUrl}/Tokenverify/enter_token_verify`;
//     return this.http.post(url, { token });
//   }

//   resendVerificationCode(email: string): Observable<any> {
//     const url = `${this.apiUrl}/ResendVerificationCode/resend-code`;
//     return this.http.post(url, { email });
//   }
// }
