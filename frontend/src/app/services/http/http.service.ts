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

  get(path):Observable<IHttp> {
    let options = { observe: 'response' as 'body'};
    return this.http.get<HttpResponse<IHttp>>(this.baseUrl + path, options).pipe(map(res => {
      return {
        status: res.status,
        body: res.body
      };
    }))
  }

  post(path, body):Observable<IHttp> {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: 'response' as 'body'};
    return this.http.post<HttpResponse<IHttp>>(this.baseUrl + path, body, options).pipe(map(res => {
      return {
        status: res.status,
        body: res.body
      };
    }));
  }
}
