import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css'],
})
export class DeleteStudentComponent {
  studentId!: string;

  deleteStudent(event: any) {
    event.preventDefault();

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http
      .post(
        'http://localhost:3000/delete-student',
        { stuId: this.studentId },
        {
          headers: headers,
        }
      )
      .subscribe((data) => console.log(data));
  }
  constructor(private http: HttpClient) {}
}
