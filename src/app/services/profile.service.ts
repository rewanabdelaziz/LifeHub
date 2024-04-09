import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private _HttpClient: HttpClient ,
    private router:Router) { }


  GetProfileInfo(UserEmail:string): Observable < any > {
    return this._HttpClient.get(`https://localhost:7105/api/Users/GetUserProfile/Profile?email=${UserEmail}`).pipe(
      catchError(error => {
        // Handle error
        console.error('Error fetching profile data:', error);
        return throwError('Error fetching profile data');
      })
    );
}
}
