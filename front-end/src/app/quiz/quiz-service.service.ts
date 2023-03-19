import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  baseUrl = 'http://localhost:3000';

  saveQuiz(quiz: any) {
    console.log('here');
    console.log(quiz);

    return this.http.post(this.baseUrl + '/save-quiz', quiz);
  }

  viewQuiz(id: string | null) {
    if (id === null) {
      return;
    }
    console.log(id);

    return this.http.get(this.baseUrl + `/view-quiz/${id}`);
  }

  constructor(private http: HttpClient) {}
}
