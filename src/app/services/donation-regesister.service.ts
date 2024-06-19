import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationRegesisterService {
//  https://localhost:7105/api/Users/bloodRegister/Blood-Register
// https://localhost:7105/api/Users/PlasmaRegister/Plasma-Register

  private apiUrl = 'https://localhost:7105/api/Users/';

  constructor(private http: HttpClient) { }

  registerBloodDonation(data: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'bloodRegister/Blood-Register', data,{ headers, responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        try {
          const jsonResponse = JSON.parse(response);
          return jsonResponse;
        } catch (jsonError) {
          return response;
        }
      }),)
  }

  registerPlasmaDonation(data: any): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'PlasmaRegister/Plasma-Register', data,{ headers, responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        try {
          const jsonResponse = JSON.parse(response);
          return jsonResponse;
        } catch (jsonError) {
          return response;
        }
      }),)
  }

  getHospitals(city: string): Observable<string[]> {
    // Implement logic to fetch hospitals based on city from the backend API
    // For demonstration, you can return mock data
    return new Observable<string[]>(observer => {
      observer.next(['Hospital 1', 'Hospital 2', 'Hospital 3']);
      observer.complete();
    });
  }
}

