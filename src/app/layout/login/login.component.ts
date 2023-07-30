import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  areShown: boolean;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  @HostListener('keypress', ['$event.key']) onKeyPress(key) {
    if (key === 'Enter') {
      this.login();
    }
  }

  ngOnInit() {
    this.createFormGroup();
    this.checkStorage();
  }

  createFormGroup() {
    this.credentials = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  verifyUser(username: string, password: string) {
    this.auth.verify(username, password);
  }

  showUsers() {
    this.areShown != this.areShown;
  }

  checkStorage() {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['products']);
    }
  }

  login() {
    var username = this.credentials.get('username').value;
    var password = this.credentials.get('password').value;
    this.verifyUser(username, password);
  }
}
