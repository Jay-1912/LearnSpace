import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

import { IInstructor } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  baseUrl:string = 'assets/temporary-data/'

  constructor(private http:HttpClient) { }

  getInstructors() : Observable<IInstructor[]>{
    return this.http.get<IInstructor[]>(this.baseUrl+'instructor.json')
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
