import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestDonorService {

  private apiUrl = 'https://localhost:7105/api/Users/';

  constructor(private http: HttpClient) { }

  requestBlood(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'RequestBlood/Request_bloodOr', data);
  }

  requestPlasma(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'RequestPlasma/RequesPlasma', data);
  }

  getHospitals(city: string): Observable<string[]> {
    // Implement logic to fetch hospitals based on city from the backend API
    // For demonstration, you can return mock data
    return new Observable<string[]>(observer => {
      observer.next(['Hospital 1', 'Hospital 2', 'Hospital 3']);
      observer.complete();
    });
  }
  getBloodType(): Observable<string[]> {
    // Implement logic to fetch hospitals based on city from the backend API
    // For demonstration, you can return mock data
    return new Observable<string[]>(observer => {
      observer.next(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
      observer.complete();
    });
  }
}
