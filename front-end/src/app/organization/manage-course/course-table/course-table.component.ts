import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { Subject } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses$:any[] = [];
  constructor(private courseService:CourseService, private instructorService:InstructorService, private organizationService:OrganizationService){}
  displayTable: boolean = false;
  displayCourses:any[] = [];
  tempInstructorName:string = "";

  handleDeleteCourse(id:string){
    this.courseService.deleteCourse(id).subscribe((res)=>{
      console.log(res);
      location.reload();
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.courseService.getCourses().subscribe((courses) =>{
      this.courses$ = courses;
      for(let course of this.courses$){
        this.organizationService.getOrganizationById(course.organization).subscribe((org)=>{
          org = org[0];
          course.organization = org.name;
        });

        this.instructorService.getInstructorByID(course.instructor).subscribe( (instructor) =>{
          instructor = instructor[0];
          course.instructor = instructor.firstName + " " + instructor.lastName;
        });
      }
      this.displayTable = true;
    })
  }
}
