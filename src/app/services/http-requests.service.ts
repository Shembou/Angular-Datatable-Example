import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(
    private http: HttpClient
    ) { }

  //normally this function would work with backend.
  get<T>(url: string, params?: any) : Observable<T> {
    return params ? 
    this.http.get<T>(`${url}/${params}`) :
    this.http.get<T>(url);
  }
  
}
