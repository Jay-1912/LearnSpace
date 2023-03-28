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
  url: string = "http://localhost:3000/"
  constructor(private http:HttpClient) {  }

  getNotices() : Observable<any>{
    const url = this.url + "notices";
    return this.http.get<any>(url)
    .pipe(
        catchError(this.handleError)
    );
  }

  getNoticeById(id:any) : Observable<any>{
    const url = this.url + "notice/"+id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postNotice(notice:any) : Observable<any>{
    const url = this.url + "add_notice";
    return this.http.post<any>(url,notice).pipe(catchError(this.handleError));
  } 

  updateNotice(id:any,notice:any) : Observable<any>{
    const url = this.url + "edit_notice/"+id;
    return this.http.post<any>(url,notice).pipe(catchError(this.handleError));
  } 

  deleteNotice(id:any) : Observable<any>{
    const url = this.url + "delete_notice/"+id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
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
