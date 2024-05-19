import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7105/api/Users/Login/login';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, credentials, { headers, responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        try {
          const jsonResponse = JSON.parse(response);
          return jsonResponse;
        } catch (jsonError) {
          return response;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred during login.';
        if (error.status === 401) {
          errorMessage = 'Invalid credentials. Please try again.';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error. Please try again later.';
        }
        console.error('Login error:', error);
        return throwError(errorMessage);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }
}
