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
import { MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';

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
    CourseGridComponent
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
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
