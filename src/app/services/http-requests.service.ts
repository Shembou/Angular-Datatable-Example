import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AppConfigService } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  loading= new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
    ) { }

  //normally this function would work with backend.
  get<T>(url: string, queryParams?: HttpParams) : Observable<T> {
    this.loading.next(true);
    return queryParams ? 
    new Observable<T>((observer) => {
      this.http.get<T>(`${this.appConfigService.apiBaseUrl+url}`, { params: queryParams } ).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
     }).pipe(
      finalize (() => {
        this.loading.next(false);
      })
     ) :
     new Observable<T>((observer) => {
      this.http.get<T>(`${this.appConfigService.apiBaseUrl+url}`).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
     }).pipe(
      finalize (() => {
        this.loading.next(false);
      })
     );
  }

  post<T>(url: string, body?:any) : Observable<T> {
    this.loading.next(true);
    return new Observable<T>((observer) => {
      this.http.post<T>(`${this.appConfigService.apiBaseUrl+url}`,body).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      finalize (() => {
        this.loading.next(false);
      })
    ); 
  }

  delete<T>(url: string, queryParams?: HttpParams) : Observable<T> {
    this.loading.next(true);
    return queryParams ? 
    new Observable<T>((observer) => {
      this.http.delete<T>(`${this.appConfigService.apiBaseUrl+url}`, { params: queryParams } ).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
     }).pipe(
      finalize (() => {
        this.loading.next(false);
      })
     ) :
     new Observable<T>((observer) => {
      this.http.delete<T>(`${this.appConfigService.apiBaseUrl+url}`).subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
     }).pipe(
      finalize (() => {
        this.loading.next(false);
      })
     );
  }
}
