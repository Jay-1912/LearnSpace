import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

import { ICourse } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl: string = 'assets/temporary-data/'

  constructor(private http:HttpClient) { }

  getCourses() : Observable<ICourse[]>{
    return this.http.get<ICourse[]>(this.baseUrl+'courses.json')
    .pipe(
        catchError(this.handleError)
    );
  }

  getCourseByID(id: string):Observable<any>{
    const url = "http://localhost:3000/course/"+id;
    return this.http.get<any>(url);
  }

  postCourse(course: any): Observable<any>{
    const url = "http://localhost:3000/add_course";
    return this.http.post<any>(url, course);
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
