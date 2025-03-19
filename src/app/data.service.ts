import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource: any;
  apiUrl = 'https://restcountries.com/v3.1/';

  constructor(public http: HttpClient) {}

  getAllCountries(): Observable<any[]> {   
    return this.http.get<any[]>(this.apiUrl + 'all');
  }

  getSearchByName(name: string): Observable<any[]> {  
    return this.http.get<any[]>(this.apiUrl + 'name/' + name);
  }

  filterByRegion(val: string): Observable<any[]> {  
    return this.http.get<any[]>(this.apiUrl + 'region/' + val);
  }
}
