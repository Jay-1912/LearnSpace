import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStudent } from 'src/app/shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
})
export class CreateTeacherComponent implements OnInit {
  createTeacherForm!: FormGroup;
  teacherData!: IStudent;

  ngOnInit(): void {
    this.createTeacherForm = this.fb.group({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      password: '',
      profile: null,
    });
  }

  handleSubmitData(event: any) {
    event.preventDefault();
    const teacherDataControl = this.createTeacherForm.controls;

    this.teacherData = {
      firstname: teacherDataControl['firstName'].value,
      lastname: teacherDataControl['lastName'].value,
      id: teacherDataControl['id'].value,
      email: teacherDataControl['email'].value,
      password: teacherDataControl['password'].value,
      profile: teacherDataControl['profile'].value,
    };

    console.log(this.teacherData);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/create-teacher', this.teacherData, {
        headers: headers,
      })
      .subscribe((data) => console.log(data));
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {}
}
