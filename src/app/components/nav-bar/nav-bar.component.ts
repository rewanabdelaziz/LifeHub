import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  loginSuccess;
  UserName: any;
  currentLanguage:string='';
  constructor(private authService: AuthService,
              private _ProfileServiceService:ProfileService,
              private translate: TranslateService,
              private languageService: LanguageService
  ){
    this.loginSuccess = this.authService.isLoggedIn;
    // this.translate.setDefaultLang('en');
  }

  // UserName=sessionStorage.getItem("UserName");
  // UserName;
  menuVariable:boolean = false;
  isLoggedIn = sessionStorage.getItem("Log In") !== null;
  email=sessionStorage.getItem("Email");
  ngOnInit(): void {

    console.log(this.email)
    if (this.email) {
      this._ProfileServiceService.GetProfileInfo(this.email).subscribe({
        next: (r) => {
          console.log(r);
          this.UserName=r.userName;
          sessionStorage.setItem("UserName",this.UserName)
        }
      });
    } else {
      console.error("Email is null");
    }

    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage=language;
      // console.log('Current language:', this.currentLanguage);
    });

  }
  // isLoggedIn=sessionStorage.getItem("Log In");
  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

  // language switch
  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }

}
