import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationRegesisterService {
//  https://localhost:7105/api/Users/BookBlood/BloodRegister?
  private apiUrl = 'https://localhost:7105/api/Users/';

  constructor(private http: HttpClient) { }

  registerBloodDonation(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'BookBlood/BloodRegister', data);
  }

  registerPlasmaDonation(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'BookPlasma/PlasmaRegister', data);
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

