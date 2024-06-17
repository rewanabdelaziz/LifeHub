import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-footer',
  // imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentLanguage:string='';

  constructor(private languageService: LanguageService){

  }

  ngOnInit(): void {
    // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    console.log('Current language:', this.currentLanguage);
  });
  }


  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
    console.log(this.applyArabicClass());
  }
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }
}
