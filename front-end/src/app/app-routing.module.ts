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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id/:title', component: CourseDescriptionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'course-content', component: CourseContentComponent },
  { path: 'organization', component: OrganizationComponent, children:[
    { path: 'dashboard', component: OrgDashboardComponent},
    { path: 'manage-course', component: ManageCourseComponent, children:[
      {path: 'courses', component: CourseTableComponent},
      {path: 'add-course', component: CourseFormComponent},
      {path: 'upload-lesson', component: UploadLessonComponent}
    ] },
    { path: 'manage-teacher', component: ManageTeacherComponent },
    { path: 'manage-student', component: ManageStudentComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
