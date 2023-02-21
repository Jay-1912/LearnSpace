import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse } from '../shared/interface';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {
  courses!:ICourse[];

  constructor(private courseService:CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      ((courses:ICourse[]) => {
        this.courses=courses
      })
    );
  }
  
}
