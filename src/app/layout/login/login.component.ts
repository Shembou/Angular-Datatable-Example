import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { HttpRequestsService } from 'src/app/services/http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: FormGroup;
  areShown: boolean;

  constructor(
    private httpRequestsService: HttpRequestsService,
    private router: Router
  ) {
  }

  @HostListener('keypress', ['$event.key']) onKeyPress(key) {
    if (key === 'Enter') {
      this.login();
    }
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.credentials = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  createBody(username: string, password: string) {
    return {
      username: username,
      password: password
    };
  }

  verifyUser(username: string, password: string) {
    const body = this.createBody(username, password);
    this.httpRequestsService.post('/users', body).subscribe({
      next: (data: User[] | any) => {
        if (data.errorMessage) {
          console.log(data.errorMessage);
        } else {
          sessionStorage.setItem('user', JSON.stringify(data[0]));
          this.router.navigate(['products']);
        }
      }
    });
  }

  showUsers() {
    this.areShown == true ?
      this.areShown = false :
      this.areShown = true;
  }

  login() {
    var username = this.credentials.get('username').value;
    var password = this.credentials.get('password').value;
    this.verifyUser(username, password);
  }
}
