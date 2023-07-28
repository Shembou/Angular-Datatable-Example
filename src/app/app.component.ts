import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpRequestsService } from './services/http-requests.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{

  loading : any;
  constructor(
    private httpRequestsService: HttpRequestsService
  ) {
  }

  ngAfterContentInit() {
    this.loading = this.httpRequestsService.loading;
  }
}
