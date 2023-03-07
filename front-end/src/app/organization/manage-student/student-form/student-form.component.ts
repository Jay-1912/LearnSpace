import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStudent } from 'src/app/shared/interface';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  createStudentForm!: FormGroup;
  studentData!: IStudent;

  ngOnInit(): void {
    this.createStudentForm = this.fb.group({
      firstName: 'firstname',
      lastName: 'lastname',
      id: 'id',
      email: 'email',
      password: 'password',
      profile: null,
    });
  }

  handleSubmitData(event: any) {
    event.preventDefault();
    const studentDataControl = this.createStudentForm.controls;

    this.studentData = {
      firstname: studentDataControl['firstName'].value,
      lastname: studentDataControl['lastName'].value,
      id: studentDataControl['id'].value,
      email: studentDataControl['email'].value,
      password: studentDataControl['password'].value,
      profile: studentDataControl['profile'].value,
    };

    console.log(this.studentData);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/create-student', this.studentData, {
        headers: headers,
      })
      .subscribe((data) => console.log(data));
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {}
}
