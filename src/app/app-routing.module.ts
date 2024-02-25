import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ForgettingPasswordComponent } from './components/forgetting-password/forgetting-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:"full" },
  {path :'home'  , component : HomeComponent },
  {path :'login'  , component : LoginComponent } ,
  {path: 'signUp' , component : SignUpComponent } ,
  { path: 'verification', component: VerificationComponent },
  { path: 'forgettingPassword', component: ForgettingPasswordComponent},
  { path: 'resetPassword', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
