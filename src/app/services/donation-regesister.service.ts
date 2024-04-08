import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationRegesisterService {

  private apiUrl = 'https://localhost:7003/api/User/';

  constructor(private http: HttpClient) { }

  registerBloodDonation(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'bloodRegister/blood_register', data);
  }

  registerPlasmaDonation(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'plasmaRegister/plasma_register', data);
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

