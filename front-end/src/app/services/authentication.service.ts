import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient) { }

  url: string = "http://localhost:3000/"

  login(loginData: any): Observable<any>{
    const url = this.url+"login";
    return this.http.post<any>(url, loginData).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn(): any{
      if(localStorage.getItem("loggedInID")){
        return localStorage.getItem("loggedInID");
      }else{
        return false;
      }
  }

  logout(): any{
    localStorage.clear();
    window.location.href="http://localhost:4200";
    return;
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
