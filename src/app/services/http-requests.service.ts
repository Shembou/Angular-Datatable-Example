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

  //method that returns product without description (backend response imitation)
  getProductWithoutDescription(url: string) : Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
      map((data: any[]) =>
      data.map(({ description, ...product}) => product)
      )
    );
  }

  getById(url: string, id: number) : Observable<any> {
    return this.http.get(url).pipe(
      map((data: any[]) => data.find(product => product.id === id))
    );
  }
}
