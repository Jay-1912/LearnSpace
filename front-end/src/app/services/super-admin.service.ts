import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  url: string = "http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getSuperAdmin():Observable<any>{
    const url = this.url + "super-admins";
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getSuperAdminById(id:string):Observable<any>{
    const url = this.url + "super-admin/"+id;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  postSuperAdmin(data:any):Observable<any>{
    const url = this.url + "add_super-admin";
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  updateSuperAdmin(id:string, data:any):Observable<any>{
    const url = this.url + "edit_super-admin/"+id;
    return this.http.post(url, data).pipe(catchError(this.handleError));
  }

  deleteSuperAdmin(id:string):Observable<any>{
    const url = this.url + "delete_super-admin/"+id;
    return this.http.get(url).pipe(catchError(this.handleError));
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
