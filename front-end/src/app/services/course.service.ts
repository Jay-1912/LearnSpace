import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

import { ICourse } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseUrl: string = 'assets/temporary-data/'
  url: string = "http://localhost:3000/"
  constructor(private http:HttpClient) { }

  getCourses() : Observable<ICourse[]>{
    return this.http.get<ICourse[]>(this.url+'courses')
    .pipe(
        catchError(this.handleError)
    );
  }

  getCourseByID(id: string):Observable<any>{
    const url = this.url+"course/"+id;
    return this.http.get<any>(url);
  }

  postCourse(course: any): Observable<any>{
    const url = this.url+"add_course";
    return this.http.post<any>(url, course);
  }

  postLesson(lesson: any): Observable<any>{
    const url = this.url+"add_lesson";
    return this.http.post<any>(url, lesson);
  }

  updateCourse(id:string, course:any): Observable<any>{
    const url = this.url+"edit_course/"+id;
    // for (const value of course.values()) {
    //   console.log(value);
    // }
    return this.http.post<any>(url, course);
  }

  deleteCourse(id:string): Observable<any>{
    const url = this.url+"delete_course/"+id;
    return this.http.get<any>(url);
  }

  updateLesson(lesson:any):Observable<any>{
    const url = this.url+"edit_lesson";
    return this.http.post<any>(url, lesson);
  }

  deleteLesson(lesson:any):Observable<any>{
    const url = this.url+"delete_lesson";
    return this.http.post<any>(url, lesson);
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
