import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './student/courses/courses.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'courses', component:CoursesComponent},
  {path:'course-description', component:CourseDescriptionComponent},
  {path:'profile', component: ProfileComponent},
  {path:'course-content', component: CourseContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
