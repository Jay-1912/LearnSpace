import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { DataTablesModule } from 'angular-datatables';

import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';
import { CourseCarouselComponent } from './course-carousel/course-carousel.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { NoticesComponent } from './notices/notices.component';
import { NoticeItemComponent } from './notices/notice-item/notice-item.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification/notification-item/notification-item.component';
import { CoursesComponent } from './student/courses/courses.component';
import { CourseGridComponent } from './course-grid/course-grid.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { CourseCurriculumComponent } from './course-curriculum/course-curriculum.component';
import { CourseInstructorComponent } from './course-instructor/course-instructor.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { LectureContentComponent } from './lecture-content/lecture-content.component';
import { LoginComponent } from './login/login.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrgDashboardComponent } from './organization/org-dashboard/org-dashboard.component';
import { ManageCourseComponent } from './organization/manage-course/manage-course.component';
import { ManageTeacherComponent } from './organization/manage-teacher/manage-teacher.component';
import { ManageStudentComponent } from './organization/manage-student/manage-student.component';
import { CourseFormComponent } from './organization/manage-course/course-form/course-form.component';
import { CourseTableComponent } from './organization/manage-course/course-table/course-table.component';
import { UploadLessonComponent } from './organization/manage-course/upload-lesson/upload-lesson.component';
import { StudentsTableComponent } from './organization/manage-student/students-table/students-table.component';
import { CreateStudentComponent } from './organization/manage-student/create-student/create-student.component';
import { UpdateStudentComponent } from './organization/manage-student/update-student/update-student.component';
import { DeleteStudentComponent } from './organization/manage-student/delete-student/delete-student.component';
import { CreateTeacherComponent } from './organization/manage-teacher/create-teacher/create-teacher.component';
import { TeacherTableComponent } from './organization/manage-teacher/teacher-table/teacher-table.component';
import { UpdateTeacherComponent } from './organization/manage-teacher/update-teacher/update-teacher.component';
import { DeleteTeacherComponent } from './organization/manage-teacher/delete-teacher/delete-teacher.component';
import { StudentFormComponent } from './organization/manage-student/student-form/student-form.component';
import { TeacherFormComponent } from './organization/manage-teacher/teacher-form/teacher-form.component';
import { ManageOrganizationComponent } from './organization/manage-organization/manage-organization.component';
import { OrganizationFormComponent } from './organization/manage-organization/organization-form/organization-form.component';
import { OrganizationTableComponent } from './organization/manage-organization/organization-table/organization-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CourseCarouselComponent,
    CourseCardComponent,
    NoticesComponent,
    NoticeItemComponent,
    NotificationComponent,
    NotificationItemComponent,
    CoursesComponent,
    CourseGridComponent,
    CourseDescriptionComponent,
    CourseOverviewComponent,
    CourseCurriculumComponent,
    CourseInstructorComponent,
    ProfileComponent,
    CourseContentComponent,
    LectureContentComponent,
    LoginComponent,
    OrganizationComponent,
    OrgDashboardComponent,
    ManageCourseComponent,
    ManageTeacherComponent,
    ManageStudentComponent,
    CourseFormComponent,
    CourseTableComponent,
    UploadLessonComponent,
    StudentsTableComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    DeleteStudentComponent,
    CreateTeacherComponent,
    TeacherTableComponent,
    UpdateTeacherComponent,
    DeleteTeacherComponent,
    StudentFormComponent,
    TeacherFormComponent,
    ManageOrganizationComponent,
    OrganizationFormComponent,
    OrganizationTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    CoreModule,
    HttpClientModule,
    MatBadgeModule,
    MatTabsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
