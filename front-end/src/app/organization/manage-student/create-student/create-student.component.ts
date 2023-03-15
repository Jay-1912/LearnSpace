import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IStudent } from 'src/app/shared/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganizationService } from 'src/app/services/organization.service';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  createStudentForm!: FormGroup;
  studentData!: any;
  organizations: any[] = [];

  ngOnInit(): void {
    this.createStudentForm = this.fb.group({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      organization: '',
      password: '',
      profile: null,
    });

    this.organizationService.getOrganization().subscribe( (res)=>{
      this.organizations = res;
    } )
  }

  handleSubmitData(event: any) {
    event.preventDefault();
    const studentDataControl = this.createStudentForm.controls;

    this.studentData = {
      firstname: studentDataControl['firstName'].value,
      lastname: studentDataControl['lastName'].value,
      id: studentDataControl['id'].value,
      email: studentDataControl['email'].value,
      organization: studentDataControl['organization'].value,
      password: studentDataControl['password'].value,
      profile: studentDataControl['profile'].value,
    };

    // console.log(this.studentData);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http
      .post('http://localhost:3000/create-student', this.studentData, {
        headers: headers,
      })
      .subscribe((data) => console.log(data));
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private organizationService: OrganizationService) {}
}
