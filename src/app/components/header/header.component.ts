import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  user: User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.user = this.getUser();
  }

  getUser() {
    return this.auth.getCurrentUser();
  }

  home() {
    this.router.navigate(['products']);
  }
  
  about() {
    this.router.navigate(['about']);
  }

  summary() {
    this.router.navigate(['summary']);
  }

  logout() {
    this.auth.signOut();
  }
}
