import { Component } from '@angular/core';

@Component({
  selector: 'app-org-admin-dashboard',
  templateUrl: './org-admin-dashboard.component.html',
  styleUrls: ['./org-admin-dashboard.component.css'],
})
export class OrgAdminDashboardComponent {
  organization: string = 'BVM';

  addCourseForm: boolean = true;
  addStudentForm: boolean = false;
  addTeacherForm: boolean = false;

  studentId: string[] = ['453', '454', '455', '456'];
  teacherId: string[] = ['01', '02', '03'];

  toggleAddCourseForm() {
    this.addCourseForm = !this.addCourseForm;
    this.addStudentForm = false;
    this.addTeacherForm = false;
  }
  toggleAddStudentForm() {
    this.addStudentForm = !this.addStudentForm;
    this.addCourseForm = false;
    this.addTeacherForm = false;
  }

  toggleAddTeacherForm() {
    this.addTeacherForm = !this.addTeacherForm;
    this.addStudentForm = false;
    this.addCourseForm = false;
  }
}
