import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

import { INotice } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})

export class NoticeService {

  baseUrl: string = 'assets/temporary-data/';
  constructor(private http:HttpClient) {  }

  getNotices() : Observable<INotice[]>{
    return this.http.get<INotice[]>(this.baseUrl+'notices.json')
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
