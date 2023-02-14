import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CourseService } from '../services/course.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[CourseService]
})
export class CoreModule { 
  
}
