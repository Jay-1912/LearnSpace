import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICourse } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl: string = 'assets/temporary-data/';
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    return this.http
      .get<ICourse[]>(this.url + 'courses')
      .pipe(catchError(this.handleError));
  }
  
  getCoursesByOrg(org: string | null):Observable<any> {
    return this.http.get(this.url + `courses/${org}`).pipe(catchError(this.handleError));
  }

  getCourseByID(id: string): Observable<any> {
    const url = this.url + 'course/' + id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postCourse(course: any): Observable<any> {
    const url = this.url + 'add_course';
    return this.http.post<any>(url, course).pipe(catchError(this.handleError));
  }

  postLesson(lesson: any): Observable<any> {
    const url = this.url + 'add_lesson';
    return this.http.post<any>(url, lesson).pipe(catchError(this.handleError));
  }

  updateCourse(id: string, course: any): Observable<any> {
    const url = this.url + 'edit_course/' + id;
    // for (const value of course.values()) {
    //   console.log(value);
    // }
    return this.http.post<any>(url, course).pipe(catchError(this.handleError));
  }

  deleteCourse(id: string): Observable<any> {
    const url = this.url + 'delete_course/' + id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  updateLesson(lesson: any): Observable<any> {
    const url = this.url + 'edit_lesson';
    return this.http.post<any>(url, lesson).pipe(catchError(this.handleError));
  }

  deleteLesson(lesson: any): Observable<any> {
    const url = this.url + 'delete_lesson';
    return this.http.post<any>(url, lesson).pipe(catchError(this.handleError));
  }

  enrollToCourse(courseID: string, studentID: string): Observable<any> {
    const url = this.url + 'enroll-to-course/' + courseID;
    return this.http
      .post<any>(url, { studentID })
      .pipe(catchError(this.handleError));
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
