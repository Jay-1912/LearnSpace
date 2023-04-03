import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

import { INotification } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl: string = 'assets/temporary-data/';
  readonly url:string = "http://localhost:3000/";
  constructor(private http:HttpClient) { }

  getNotificationById(id:string):Observable<any>{
    const url = this.url + "get_notification/"+id;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  seenNotifications(data:any):Observable<any>{
    const url = this.url + "seen_notifications";
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(() => new Error(errMessage));
        // Use the following instead if using lite-server
        // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(() => new Error(error || 'Node.js server error'));
  }
}
