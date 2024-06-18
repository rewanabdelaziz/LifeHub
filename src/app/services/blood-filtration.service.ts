import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodFiltrationService {

  constructor(private http: HttpClient) { }


  submitForm(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://localhost:7105/api/Users/BloodFilteration/Blood_Filtration', formData,{ headers, responseType: 'text' as 'json' }).pipe(
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
