import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ForgettingPasswordComponent } from './components/forgetting-password/forgetting-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { DonationComponent } from './components/donation/donation.component';
import { RequestDonationComponent } from './components/request-donation/request-donation.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthGuard } from './auth.guard';
import { ReportComponent } from './components/report/report.component';
import { DiseaseTestsComponent } from './components/disease-tests/disease-tests.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:"full" },
  {path :'home'  , component : HomeComponent },
  {path :'login'  , component : LoginComponent } ,
  {path: 'signUp' , component : SignUpComponent } ,
  { path: 'verification', component: VerificationComponent },
  { path: 'forgettingPassword', component: ForgettingPasswordComponent},
  { path: 'profile', component: ProfileComponent},
  {path:"auth-nav", component:AuthNavComponent},
  {path: "donation",component:DonationComponent},
  {path: "requestDonation",component:RequestDonationComponent},
  {path: "disease-tests",component:DiseaseTestsComponent},
  {path: "service",component:ServicesComponent,canActivate: [AuthGuard] },
  {path: "report",component:ReportComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
