import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
interface Hospital {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  latitude: number;
  longitude: number;
  city: string;
}
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  // get location of user
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  // get nearby hospitals to user

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<any[]>('/assets/hospitals.json').pipe(
      map(data => {
        return data.map(item => ({
          id: item.id,
          name: {
            en: item.name.en,
            ar: item.name.ar
          },
          latitude: item.latitude,
          longitude: item.longitude,
          city: item.city
        })) as Hospital[]; // Cast the array to Hospital[] type
      })
    );
  }

  getNearbyHospitals(latitude: number, longitude: number, language: 'en' | 'ar'): Observable<Hospital[]> {
    return this.getHospitals().pipe(
      map(hospitals => hospitals.filter(hospital => {
        const distance = this.getDistanceFromLatLonInKm(latitude, longitude, hospital.latitude, hospital.longitude);
        return distance <= 50; // Filter hospitals within 50 km radius
      }).map(hospital => ({
        id: hospital.id,
        name: {
          en: hospital.name.en,
          ar: hospital.name.ar
        },
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        city: hospital.city
      })))
    );
  }

  private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  getHospitalsByCity(city: string, language: 'en' | 'ar'): Observable<Hospital[]> {
    return this.getHospitals().pipe(
      map(hospitals => hospitals.filter(hospital => hospital.city.toLowerCase() === city.toLowerCase()))
    );
  }
}
