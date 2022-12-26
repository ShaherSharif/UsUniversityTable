import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, pluck, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  //Get All US university data
  getUsUniversityUrl = 'http://universities.hipolabs.com/search?country=United+States';
  getUsUniversity(): Observable<any> {
    return this.http.get(this.getUsUniversityUrl);
  }

  //Get US university by name
  getUsUniversityByNameUrl ='http://universities.hipolabs.com/search?country=United+States&name=';
  getUsUniversityByName( search:any): Observable<any> {
    return this.http.get(this.getUsUniversityByNameUrl+search);
  }
}
