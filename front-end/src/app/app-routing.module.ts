import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { LoginComponent } from './login/login.component';
import { CourseFormComponent } from './organization/manage-course/course-form/course-form.component';
import { CourseTableComponent } from './organization/manage-course/course-table/course-table.component';
import { ManageCourseComponent } from './organization/manage-course/manage-course.component';
import { UploadLessonComponent } from './organization/manage-course/upload-lesson/upload-lesson.component';
import { ManageStudentComponent } from './organization/manage-student/manage-student.component';
import { ManageTeacherComponent } from './organization/manage-teacher/manage-teacher.component';
import { OrgDashboardComponent } from './organization/org-dashboard/org-dashboard.component';
import { OrganizationComponent } from './organization/organization.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './student/courses/courses.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { StudentsTableComponent } from './organization/manage-student/students-table/students-table.component';
import { CreateStudentComponent } from './organization/manage-student/create-student/create-student.component';
import { DeleteStudentComponent } from './organization/manage-student/delete-student/delete-student.component';
import { UpdateStudentComponent } from './organization/manage-student/update-student/update-student.component';
import { TeacherTableComponent } from './organization/manage-teacher/teacher-table/teacher-table.component';
import { CreateTeacherComponent } from './organization/manage-teacher/create-teacher/create-teacher.component';
import { DeleteTeacherComponent } from './organization/manage-teacher/delete-teacher/delete-teacher.component';
import { UpdateTeacherComponent } from './organization/manage-teacher/update-teacher/update-teacher.component';
import { StudentFormComponent } from './organization/manage-student/student-form/student-form.component';
import { TeacherFormComponent } from './organization/manage-teacher/teacher-form/teacher-form.component';
import { ManageOrganizationComponent } from './organization/manage-organization/manage-organization.component';
import { OrganizationFormComponent } from './organization/manage-organization/organization-form/organization-form.component';
import { OrganizationTableComponent } from './organization/manage-organization/organization-table/organization-table.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id/:title', component: CourseDescriptionComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'course/:id/:title/:section/:lesson',
    component: CourseContentComponent,
  },
  {
    path: 'admin',
    component: OrganizationComponent,
    children: [
      { path: 'dashboard', component: OrgDashboardComponent },
      {
        path: 'manage-course',
        component: ManageCourseComponent,
        children: [
          { path: 'courses', component: CourseTableComponent },
          { path: 'add-course', component: CourseFormComponent },
          { path: ':id/upload-lesson', component: UploadLessonComponent },
          { path: 'edit-course/:id', component: CourseFormComponent },
        ],
      },
      {
        path: 'manage-teacher',
        component: ManageTeacherComponent,

        children: [
          { path: '', component: TeacherTableComponent },
          { path: 'create-teacher', component: TeacherFormComponent },
          { path: 'delete-teacher/:id', component: TeacherTableComponent },
          { path: 'update-teacher/:id', component: TeacherFormComponent },
        ],
      },
      {
        path: 'manage-student',
        component: ManageStudentComponent,
        children: [
          { path: '', component: StudentsTableComponent },
          { path: 'create-student', component: StudentFormComponent },
          { path: 'delete-student/:id', component: StudentsTableComponent },
          { path: 'update-student/:id', component: StudentFormComponent },
        ],
      },
      {
        path: 'manage-organization',
        component: ManageOrganizationComponent,
        children:[
          { path: '', component: OrganizationTableComponent },
          { path: 'add-organization', component: OrganizationFormComponent },
          { path: 'edit-organization/:id', component: OrganizationFormComponent }
        ]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
