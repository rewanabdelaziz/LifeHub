import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7105/api/Users/Login';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, credentials, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response=> {
          // Try parsing the response as JSON
          try {
            const jsonResponse = JSON.parse(response as string);
            return jsonResponse;
          } catch (jsonError) {
            // If parsing as JSON fails, return the response as is
            return response;
          }
        }),
        catchError(error => {
          // Handle error
          console.error('Login error:', error);
          return throwError('An error occurred during login.');
        })
      );
  }

}
