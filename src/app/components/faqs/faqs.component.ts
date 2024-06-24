import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-faqs',
  standalone: false,
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent {

  currentLanguage:string='';
  accessToken: string='';
  // index:number=1;
  constructor(private languageService: LanguageService,) {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }


  ngOnInit(): void {
     // language
  this.languageService.currentLanguage$.subscribe(language => {
    this.currentLanguage=language;
    // console.log('Current language:', this.currentLanguage);
  });
  }













      private collapsedStates: { [key: string]: boolean } = {
    collapseOne: true, // Initially show content when the component loads
    collapseTwo: true, // Initially show content when the component loads
    collapseThree: true, // Initially show content when the component loads
    collapseFour: true, // Initially show content when the component loads
    collapseFive: true, // Initially show content when the component loads
    collapseSix: true, // Initially show content when the component loads
    collapseSeven: true, // Initially show content when the component loads
    collapseEight: true, // Initially show content when the component loads




        collapse1: true, // Initially show content when the component loads
    collapse2: true, // Initially show content when the component loads
    collapse3: true, // Initially show content when the component loads
    collapse4: true, // Initially show content when the component loads
    collapse5: true, // Initially show content when the component loads
    collapse6: true, // Initially show content when the component loads
    collapse7: true, // Initially show content when the component loads
    collapse8: true, // Initially show content when the component loads
        collapse9: true, // Initially show content when the component loads


        collapse01: true, // Initially show content when the component loads
    collapse02: true, // Initially show content when the component loads
    collapse03: true, // Initially show content when the component loads
    collapse04: true, // Initially show content when the component loads
    collapse05: true, // Initially show content when the component loads
    collapse06: true, // Initially show content when the component loads
    collapse07: true, // Initially show content when the component loads
    collapse08: true, // Initially show content when the component loads
        collapse09: true, // Initially show content when the component loads



        collapse001: true, // Initially show content when the component loads
    collapse002: true, // Initially show content when the component loads
    collapse003: true, // Initially show content when the component loads
    collapse004: true, // Initially show content when the component loads
    collapse005: true, // Initially show content when the component loads
    collapse006: true, // Initially show content when the component loads
    collapse007: true, // Initially show content when the component loads
        collapse008: true, // Initially show content when the component loads




        collapseI1: true, // Initially show content when the component loads
    collapseI2: true, // Initially show content when the component loads
    collapseI3: true, // Initially show content when the component loads
    collapseI4: true, // Initially show content when the component loads
    collapseI5: true, // Initially show content when the component loads
    collapseI6: true, // Initially show content when the component loads
    collapseI7: true, // Initially show content when the component loads
    collapseI8: true, // Initially show content when the component loads
    collapseI9: true, // Initially show content when the component loads





  };

  toggleCollapse(id: string) {
    this.collapsedStates[id] = !this.collapsedStates[id];
  }

  isCollapsed(id: string): boolean {
    return this.collapsedStates[id];
  }

// language
switchLanguage(language: 'en' | 'ar') {
  this.currentLanguage = language;
}

applyArabicClass(): boolean {
  return this.currentLanguage === 'ar';
}
}
