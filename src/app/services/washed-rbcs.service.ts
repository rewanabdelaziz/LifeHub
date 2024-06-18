import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WashedRBCSService {
  private apiUrl = 'https://localhost:7105/api/Users/WashedRbcs/Washed_Rbcs';


  constructor(private _HttpClient: HttpClient) { }
  // text/plain; charset=utf-8

  WashedRBCSService(data: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._HttpClient.post<any>(this.apiUrl , data,{ headers, responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        try {
          const jsonResponse = JSON.parse(response);
          return jsonResponse;
        } catch (jsonError) {
          return response;
        }
      }),
    );
  }
}
