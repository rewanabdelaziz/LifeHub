// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem("Log In")) {
      return true; // Allow navigation
    } else {
      alert('You need to log in first.'); // Show pop-up message
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Prevent navigation
    }
  }
}
