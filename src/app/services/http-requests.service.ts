import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
    ) { }

  //normally this function would work with backend.
  get<T>(url: string, queryParams?: HttpParams) : Observable<T> {
    return queryParams ? 
    this.http.get<T>(`${this.appConfigService.apiBaseUrl+url}`, { params: queryParams } ) :
    this.http.get<T>(this.appConfigService.apiBaseUrl+url);
  }

  post<T>(url: string, body?:any) : Observable<T> {
     return this.http.post<T>(`${this.appConfigService.apiBaseUrl+url}`,body); 
  }

  delete<T>(url, queryParams?: HttpParams) : Observable<T> {
    return queryParams ? 
    this.http.delete<T>(`${this.appConfigService.apiBaseUrl+url}`, { params: queryParams} ) :
    this.http.delete<T>(this.appConfigService.apiBaseUrl+url);
  }  
}
