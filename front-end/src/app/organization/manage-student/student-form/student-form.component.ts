import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/shared/interface';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { StudentsTableComponent } from '../students-table/students-table.component';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  // TODO:fetch org how?
  organization: string = 'bvm';

  imageSrc!: any;
  createStudentForm!: FormGroup;
  studentData!: any;
  profile!: File;
  profileBuffer!: ArrayBuffer;
  @ViewChild('profile') profilepic!: ElementRef;
  @ViewChild('submit') submit!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  stuId: any;
  tempData!: any;
  baseUrl!: string;
  updateMode: boolean = false;
  ngOnInit(): void {
    this.createStudentForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      id: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      profile: new FormControl(),
      organization: new FormControl(this.organization),
    });

    this.stuId = this.route.snapshot.paramMap.get('id');
    if (this.stuId != undefined) {
      setTimeout(() => {
        this.title.nativeElement.innerText = 'Update Student';
        this.submit.nativeElement.innerText = 'Update Student';
      }, 10);
    }
    if (this.stuId != null) {
      this.updateMode = true;
      this.studentService.getStudentById(this.stuId).subscribe((data) => {
        this.tempData = data;

        console.log(data);

        this.createStudentForm.controls['firstName'].setValue(
          data[0].firstName
        );
        this.createStudentForm.controls['lastName'].setValue(data[0].lastName);
        this.createStudentForm.controls['email'].setValue(data[0].email);
        this.createStudentForm.controls['password'].setValue(data[0].password);

        this.createStudentForm.controls['profile'].setValue(data[0].profile);
        this.imageSrc = 'http://localhost:3000/images/' + data[0].profile;
        this.createStudentForm.controls['organization'].setValue(
          data[0].organization
        );
      });
    } else {
    }
  }

  async uploadProfile(event: any) {
    this.profile = event.target.files[0];
    this.profileBuffer = await this.profile.arrayBuffer();

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result?.toString());

      reader.readAsDataURL(file);
    }
  }

  handleSubmitData(event: any) {
    console.log('handle submit called');

    event.preventDefault();
    const studentDataControl = this.createStudentForm.controls;

    const studentFormData = new FormData();
    studentFormData.append('firstname', studentDataControl['firstName'].value);
    studentFormData.append('lastname', studentDataControl['lastName'].value);
    studentFormData.append('email', studentDataControl['email'].value);
    studentFormData.append('password', studentDataControl['password'].value);
    let selectedFile = this.profilepic.nativeElement.files[0];
    if (selectedFile) {
      studentFormData.append('profile', this.profilepic.nativeElement.files[0]);
    } else {
      studentFormData.append(
        'profile',
        this.createStudentForm.controls['profile'].value
      );
    }
    studentFormData.append('organization', this.organization);

    if (this.stuId != undefined) {
      console.log('student id is not unefined');

      this.baseUrl = 'http://localhost:3000/update-student/' + this.stuId;

      this.http
        .post(this.baseUrl, studentFormData)
        .subscribe((data) => console.log(data));
    } else {
      this.baseUrl = 'http://localhost:3000/create-student/';
      this.http
        .post(this.baseUrl, studentFormData)
        .subscribe((data) => console.log(data));
    }
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private studentService: StudentServicesService,
    private router: Router
  ) {}
}
