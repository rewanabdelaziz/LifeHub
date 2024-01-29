import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private baseUrl = 'https://localhost:7105/api/User';

  constructor(private http: HttpClient) {}

  verifyUser(token: string): Observable<any> {
    const url = `${this.baseUrl}/verify/${token}`;
    return this.http.get<any>(url);
  }
  resendVerificationEmail(email: string): Observable<any> {
    const resendUrl = `${this.baseUrl}/resend-verification`; // Update the API endpoint accordingly
    const payload = { email };

    return this.http.post(resendUrl, payload);
  }
}
