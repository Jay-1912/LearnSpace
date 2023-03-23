import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, ObservedValueOf, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getQuizes(): Observable<any>{
    const url = this.url + 'quizes';
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getQuizById(id:string): Observable<any>{
    const url = this.url + 'quiz/'+id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postQuiz(quiz: any): Observable<any> {
    const url = this.url + 'add_quiz';
    return this.http.post<any>(url, quiz).pipe(catchError(this.handleError));
  }

  updateQuiz(id:string, quiz:any):Observable<any>{
    const url = this.url + 'edit_quiz/'+id;
    return this.http.post<any>(url, quiz).pipe(catchError(this.handleError));
  }

  deleteQuiz(id:string):Observable<any>{
    const url = this.url + 'delete_quiz/'+id;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  postQuestion(id:string, question:any): Observable<any>{
    const url = this.url + "add_question/"+id;
    return this.http.post<any>(url, question).pipe(catchError(this.handleError));
  }

  updateQuestion(id:string, question:any): Observable<any>{
    const url = this.url + "edit_question/"+id;
    return this.http.post<any>(url, question).pipe(catchError(this.handleError));
  }

  deleteQuestion(id:string, index:number): Observable<any>{
    const url = this.url+ "delete_question/"+id+"/"+index;
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
