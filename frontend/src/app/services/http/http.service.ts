import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IHttp } from "../../models/http.model";

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:8080/"

  constructor(private http:HttpClient) { }

  get(path):Observable<any> {
    let options = {  };
    return this.http.get<HttpResponse<any>>(this.baseUrl + path, options);
  }

  post(path, body):Observable<any> {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<HttpResponse<any>>(this.baseUrl + path, body, options);
  }
}
