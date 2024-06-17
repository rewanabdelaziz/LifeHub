import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private currentLanguage = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage.next(language);
    localStorage.setItem('language', language);
  }

}
