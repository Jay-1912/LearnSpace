import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { StudentServicesService } from 'src/app/services/student-services.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  // TODO:fetch org how?
  organizations: any[] = [];

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
  loggedInUserId!:string;
  loggedInUserRole!:number;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }

    this.createStudentForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      id: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      profile: new FormControl(),
      organization: new FormControl(),
    });

    if(this.loggedInUserRole != 0 ){
      if(this.loggedInUserRole==1){
        this.createStudentForm.controls["organization"].setValue(this.loggedInUserId);
      }
    }

    this.organizationService.getOrganization().subscribe((res) => {
      this.organizations = res;
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
        this.createStudentForm.controls['phone'].setValue(data[0].phone);
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
    studentFormData.append('phone', studentDataControl['phone'].value);
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
    studentFormData.append(
      'organization',
      studentDataControl['organization'].value
    );
    if (this.stuId != undefined) {
      console.log('student id is not unefined');

      this.baseUrl = 'http://localhost:3000/update-student/' + this.stuId;

      this.http.post(this.baseUrl, studentFormData).subscribe((data) => {
        console.log(data);
        this.openSnackBar('Student updated successfully', 'close');
      });
    } else {
      this.baseUrl = 'http://localhost:3000/create-student';
      this.http.post(this.baseUrl, studentFormData).subscribe((data) => {
        console.log(data);
        this.openSnackBar('Student added successfully', 'close');
      });
    }
  }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private studentService: StudentServicesService,
    private router: Router,
    private organizationService: OrganizationService,
    private _snackBar: MatSnackBar,
    private authService:AuthenticationService
  ) {}
}
