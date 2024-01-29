import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { VerificationComponent } from './components/verification-component/verification-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:"full" },
  {path :'home'  , component : HomeComponent },
  {path :'login'  , component : LoginComponent } ,
  {path: 'signUp' , component : SignUpComponent } ,
  { path: 'verify/:token', component: VerificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
