import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user != null;
  }

  signOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

