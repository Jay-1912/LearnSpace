import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { Subject,from } from 'rxjs';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses$:any[] = [];
  constructor(private courseService:CourseService, private instructorService:InstructorService){}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.courseService.getCourses().subscribe( (courses) =>{
      this.courses$ = courses;
    } )
  }

  // getInstructorName(id:string): string{
  //   let instructorName="";
  //   this.instructorService.getInstructorByID(id).subscribe( (instructor) =>{
  //     instructor = instructor[0];
  //     instructorName = instructor.firstName + " " + instructor.lastName;
  //   } )
  //   return instructorName;
  // }

}
