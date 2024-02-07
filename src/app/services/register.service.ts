import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private verificationStatus: string = 'unknown';
  private apiUrl = 'https://localhost:7105/api/User/register';

  // Create a Subject to hold email information
  private emailSubject = new Subject<string>();
  email$ = this.emailSubject.asObservable();


  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Set responseType to 'text' to prevent JSON parsing
    const options = { headers, responseType: 'text' as 'json' };

    // Set the email in the Subject when registering
    this.emailSubject.next(user.email);

    return this.http.post(this.apiUrl, user, options);
  }
  setVerificationStatus(status: string): void {
    this.verificationStatus = status;
  }

  getVerificationStatus(): string {
    return this.verificationStatus;
  }
}
