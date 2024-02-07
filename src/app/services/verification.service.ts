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
    const url = `${this.baseUrl}/verify?token=${token}`;
    return this.http.post<any>(url, {});
  }

  resendVerificationCode(email: string): Observable<any> {
    const url = `${this.baseUrl}/resend-code`;
    const payload = { email };
    return this.http.post<any>(url, payload);
  }
}
