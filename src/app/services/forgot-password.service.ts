import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private _HttpClient: HttpClient) {
  }

    ForgotPassword(userEmail:object): Observable < any > {
      return this._HttpClient.post(`https://localhost:7105/api/Users/ForgotPassword/forgot-password`, userEmail)
  }

    resetCode(code:object): Observable < any > {
      return this._HttpClient.post(`/api/User/ResendVerificationCode/resend-code`, code)
  }

    resetNewPass(newPass:object): Observable < any > {
      return this._HttpClient.post(`/api/UsersControoler/reset-password`,newPass)
    }
}

