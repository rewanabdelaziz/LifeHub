import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WashedRBCSService {
  private apiUrl = 'https://localhost:7105/api/Users/WashedRbcs/Washed_Rbcs';

  constructor(private _HttpClient: HttpClient) { }


   WashedRBCSService(data: any): Observable<string> {
    return this._HttpClient.post<any>(this.apiUrl , data);
  }
}
