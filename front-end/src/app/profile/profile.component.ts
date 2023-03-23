import { Component, OnInit } from '@angular/core';
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

  handleSaveProfile(event: any) {
    event.preventDefault();
    console.log('save profile called');
  }

  async ngOnInit() {
    this.userProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      profile: new FormControl(Validators.required),
      organization: new FormControl(Validators.required),
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
              this.userProfileData = data;
            });
            break;

          case UserRole.Teacher:
            this.teacherService.getTeacherById(userId).subscribe((data) => {
              this.userProfileData = data;
            });
            break;

          case UserRole.Student:
            this.studentService.getStudentById(userId).subscribe((data) => {
              this.userProfileData = data;
            });
            break;
        }
      }
    }
  }
}
