import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  private RecipintsapiUrl = 'https://localhost:7003/api/User/GetTotalRecipints/total_Recipints';
  private DonorasCountapiUrl = 'https://localhost:7003/api/User/GetTotalDonors/totalcount';
  private TotalRegeistersapiUrl = 'https://localhost:7003/api/User/GetTotalCount/totalcount';

  constructor(private http: HttpClient) { }

  getTotalRecipients(): Observable<any> {

    return this.http.get<any>(this.RecipintsapiUrl);
  }

  getTotalDonars(): Observable<any> {

    return this.http.get<any>(this.DonorasCountapiUrl);
  }

  getTotalRegeisters(): Observable<any> {

    return this.http.get<any>(this.TotalRegeistersapiUrl);
  }
}
