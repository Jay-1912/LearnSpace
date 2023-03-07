import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses$:any[] = [];
  constructor(private courseService:CourseService, private instructorService:InstructorService){}
  displayTable: boolean = false;
  displayCourses:any[] = [];
  tempInstructorName:string = "";

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.courseService.getCourses().subscribe((courses) =>{
      this.courses$ = courses;
      for(let course of this.courses$){
        this.instructorService.getInstructorByID(course.instructor).subscribe( (instructor) =>{
          instructor = instructor[0];
          course.instructor = instructor.firstName + " " + instructor.lastName;
        });
      }
      this.displayTable = true;
    })

  }

  getInstructorName(id:string){
    
  }

}
