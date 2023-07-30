import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestsService } from './http-requests.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private httpRequestsService: HttpRequestsService,
    private toastr: ToastrService
  ) { }

  get isLoggedIn(): boolean {
    return this.getCurrentUser != null;
  }

  signOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  verify(username: string, password: string) {
    const body = this.createBody(username, password);
    this.httpRequestsService.post('/users', body).subscribe({
      next: (data: User[] | any) => {
        if (data.errorMessage) {
          this.toastr.error(`${data.errorMessage}`, 'Error');
        } else {
          sessionStorage.setItem('user', JSON.stringify(data[0]));
          this.router.navigate(['products']);
        }
      }
    });
  }

  createBody(username: string, password: string) {
    return {
      username: username,
      password: password
    };
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

