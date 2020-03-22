import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:8080/api/"

  constructor(public http:HttpClient, public zone: NgZone) { }

  get(path:string):Observable<any> {
    let options = {  };
    return this.http.get<HttpResponse<any>>(this.baseUrl + path, options)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  post(path:string, body:any):Observable<any> {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<HttpResponse<any>>(this.baseUrl + path, body, options)
      .pipe(catchError(this.handleError<any>('post', [])));
  }


  getServerSentEvent(url:string) {
    return Observable.create(observer => {
      const eventSource = this.getEventSource(this.baseUrl + url);

      eventSource.onopen = event => {
        this.zone.run(() => {
          console.log("connection opened");
        });
      };

      eventSource.onmessage = event => {
        this.zone.run(() => {
          observer.next(event.data);
        });
      };

      eventSource.onerror = error => {
        this.zone.run(() => {
          observer.error(error)
        });
      };
    });
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error.error)
    }
  }

  public getEventSource(url:string):EventSource {
    return new EventSource(url);
  }

}
