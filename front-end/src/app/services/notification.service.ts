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

  constructor(private http:HttpClient) { }

  getNotifications():Observable<INotification[]>{
    return this.http.get<INotification[]>(this.baseUrl + 'notifications.json')
    .pipe(
      catchError(this.handleError)
    );
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
