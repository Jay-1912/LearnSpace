import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherServicesService } from 'src/app/services/teacher-services.service';
@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css'],
})
export class TeacherFormComponent implements OnInit {
  // TODO:fetch org how?
  organization: string = 'bvm';

  imageSrc!: any;
  createTeacherForm!: FormGroup;
  profile!: File;
  profileBuffer!: ArrayBuffer;
  @ViewChild('profile') profilepic!: ElementRef;
  @ViewChild('submit') submit!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  teacherId: any;
  tempData!: any;
  baseUrl!: string;
  updateMode: boolean = false;
  ngOnInit(): void {
    this.createTeacherForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      id: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      profile: new FormControl(),
      organization: new FormControl(this.organization),
    });

    this.teacherId = this.route.snapshot.paramMap.get('id');
    if (this.teacherId != undefined) {
      setTimeout(() => {
        this.title.nativeElement.innerText = 'Update Teacher';
        this.submit.nativeElement.innerText = 'Update Teacher';
      }, 10);
    }
    if (this.teacherId != null) {
      this.updateMode = true;
      this.teacherService.getTeacherById(this.teacherId).subscribe((data) => {
        this.tempData = data;

        console.log(data);

        this.createTeacherForm.controls['firstName'].setValue(
          data[0].firstName
        );
        this.createTeacherForm.controls['lastName'].setValue(data[0].lastName);
        this.createTeacherForm.controls['email'].setValue(data[0].email);
        this.createTeacherForm.controls['password'].setValue(data[0].password);

        this.createTeacherForm.controls['profile'].setValue(data[0].profile);
        this.imageSrc = 'http://localhost:3000/images/' + data[0].profile;
        this.createTeacherForm.controls['organization'].setValue(
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
    console.log('handle submit for teacher called');

    event.preventDefault();
    const teacherDataControl = this.createTeacherForm.controls;

    const teacherFormData = new FormData();
    teacherFormData.append('firstname', teacherDataControl['firstName'].value);
    teacherFormData.append('lastname', teacherDataControl['lastName'].value);
    teacherFormData.append('email', teacherDataControl['email'].value);
    teacherFormData.append('password', teacherDataControl['password'].value);
    let selectedFile = this.profilepic.nativeElement.files[0];
    if (selectedFile) {
      teacherFormData.append('profile', this.profilepic.nativeElement.files[0]);
    } else {
      teacherFormData.append(
        'profile',
        this.createTeacherForm.controls['profile'].value
      );
    }
    teacherFormData.append('organization', this.organization);

    if (this.teacherId != undefined) {
      console.log('student id is not unefined');

      this.baseUrl = 'http://localhost:3000/update-teacher/' + this.teacherId;

      this.http
        .post(this.baseUrl, teacherFormData)
        .subscribe((data) => console.log(data));
    } else {
      this.baseUrl = 'http://localhost:3000/create-teacher/';
      this.http
        .post(this.baseUrl, teacherFormData)
        .subscribe((data) => console.log(data));
    }
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private teacherService: TeacherServicesService,
    private router: Router
  ) {}
}
