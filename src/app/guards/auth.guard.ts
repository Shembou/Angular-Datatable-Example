import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor (
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean{
    const user = this.authService.getCurrentUser();

    const isSecured = next.data['secured'] as boolean;

    if (this.authService.isLoggedIn != true) {
      this.router.navigate(['login']);
      return false;
    } else if (isSecured && isSecured != user.isAdmin) {
      window.alert('Access Denied');
      return false;
    } else {
      return true;
    }
  }
};