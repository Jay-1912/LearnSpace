import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserRole } from '../shared/AppEnums';
import { OrganizationService } from '../services/organization.service';
import { StudentServicesService } from '../services/student-services.service';
import { TeacherServicesService } from '../services/teacher-services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private orgService: OrganizationService,
    private studentService: StudentServicesService,
    private teacherService: TeacherServicesService
  ) {}

  userProfileData: any;
  userProfileForm!: FormGroup;
  imageSrc: string | undefined =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Duser%2BAvatar&psig=AOvVaw2O15iXZ3S_gNOUmQApW-OX&ust=1679768822875000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOjh9NGY9f0CFQAAAAAdAAAAABAQ';
  orgProfileForm!: FormGroup;
  orgProfileData: any;

  userRole!: any;

  @ViewChild('userProfile') profile!: ElementRef;
  handleSaveProfile(event: any) {
    event.preventDefault();
    console.log('save profile called');
  }

  async uploadProfile(event: any) {
    this.profile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result?.toString());

      reader.readAsDataURL(file);
    }
  }

  async ngOnInit() {
    this.userRole = localStorage.getItem('role');
    console.log(this.userRole);

    this.userProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      profile: new FormControl(Validators.required),
      organization: new FormControl(Validators.required),
    });

    this.orgProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      profile: new FormControl(Validators.required),
    });

    if (!this.authService.isLoggedIn()) {
      window.location.href = 'http://localhost:4200';
    } else {
      const userId = localStorage.getItem('loggedInID');
      const userRole = localStorage.getItem('role');
      console.log(userId, userRole);

      if (userRole != null && userId != null) {
        switch (parseInt(userRole)) {
          case UserRole.Organization:
            this.orgService.getOrganizationById(userId).subscribe((data) => {
              this.orgProfileData = data[0];
              console.log(this.orgProfileData);

              this.orgProfileForm.controls['name'].setValue(
                this.orgProfileData.name
              );
              this.orgProfileForm.controls['email'].setValue(
                this.orgProfileData.email
              );
              this.orgProfileForm.controls['password'].setValue(
                this.orgProfileData.password
              );
              this.imageSrc =
                'http://localhost:3000/images/' + this.orgProfileData.image;
            });
            break;

          case UserRole.Teacher:
            this.teacherService.getTeacherById(userId).subscribe((data) => {
              this.userProfileData = data[0];
              console.log(this.userProfileData);

              this.userProfileForm.controls['firstName'].setValue(
                this.userProfileData.firstName
              );
              this.userProfileForm.controls['lastName'].setValue(
                this.userProfileData.lastName
              );
              this.userProfileForm.controls['email'].setValue(
                this.userProfileData.email
              );
              this.userProfileForm.controls['phone'].setValue(
                this.userProfileData.phone
              );
              this.userProfileForm.controls['password'].setValue(
                this.userProfileData.password
              );
              this.userProfileForm.controls['organization'].setValue(
                this.userProfileData.organization
              );
            });
            break;

          case UserRole.Student:
            this.studentService.getStudentById(userId).subscribe((data) => {
              this.userProfileData = data[0];

              this.userProfileForm.controls['firstName'].setValue(
                this.userProfileData.firstName
              );
              this.userProfileForm.controls['lastName'].setValue(
                this.userProfileData.lastName
              );
              this.userProfileForm.controls['email'].setValue(
                this.userProfileData.email
              );
              this.userProfileForm.controls['phone'].setValue(
                this.userProfileData.phone
              );
              this.userProfileForm.controls['password'].setValue(
                this.userProfileData.password
              );
              this.userProfileForm.controls['organization'].setValue(
                this.userProfileData.organization
              );
            });
            break;
        }
      }
    }
  }
}
