import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { OrgAdminDashboardComponent } from './org_admin/org-admin-dashboard/org-admin-dashboard.component';

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
    OrgAdminDashboardComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
