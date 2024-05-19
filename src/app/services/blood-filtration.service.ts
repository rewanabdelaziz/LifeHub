import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodFiltrationService {

  constructor(private http: HttpClient) { }


  submitForm(formData: FormData): Observable<any> {
    return this.http.post<any>('https://localhost:7105/api/Users/Add/Blood_Filtration', formData);
  }
}
