import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { CoursesComponent } from './student/courses/courses.component';
import { DashboardComponent } from './student/dashboard/dashboard.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'courses', component:CoursesComponent},
  {path:'course-description', component:CourseDescriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
