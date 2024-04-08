import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private _HttpClient: HttpClient ,
    private router:Router) { }


  GetProfileInfo(UserEmail:string): Observable < any > {
    return this._HttpClient.get(`https://localhost:7003/api/User/GetUserProfile/${UserEmail}`);
}
}
