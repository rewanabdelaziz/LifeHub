import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationService } from './services/verification.service';
import { VerificationComponent } from './components/verification/verification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { DonationComponent } from './components/donation/donation.component';
import { RequestDonationComponent } from './components/request-donation/request-donation.component';
import { DatePipe } from '@angular/common';
import { InViewDirective } from './directives/in-view.directive';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { ReportComponent } from './components/report/report.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FAQsComponent } from './components/faqs/faqs.component';
import { ForgettingPasswordComponent } from './components/forgetting-password/forgetting-password.component';
import { LoaderComponent } from './components/loader/loader.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    VerificationComponent,
    ProfileComponent,
    DonationComponent,
    RequestDonationComponent,
    InViewDirective,
    FooterComponent,
    ServicesComponent,
    ReportComponent,
    NavBarComponent,
    FAQsComponent,
    ForgettingPasswordComponent,
    LoaderComponent,


    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [VerificationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
