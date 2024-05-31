import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { DatePipe } from '@angular/common';
import { InViewDirective } from './directives/in-view.directive';
import { FooterComponent } from './components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { ReportComponent } from './components/report/report.component';
import { DiseaseTestsComponent } from './components/disease-tests/disease-tests.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    VerificationComponent,
    ProfileComponent,
    AuthNavComponent,
    DonationComponent,
    RequestDonationComponent,
    InViewDirective,
    FooterComponent,
    ServicesComponent,
    ReportComponent,
    NavBarComponent,
    DiseaseTestsComponent


    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [VerificationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
