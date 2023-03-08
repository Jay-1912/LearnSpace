import { Component, OnInit } from '@angular/core';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  students$:any[] = [];
  organization: String = "bvm";
  constructor(private studentService:StudentServicesService){}
  displayTable: boolean = false;
  displayStudents:any[] = [];

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
      
    };
      this.studentService.getStudentsByOrg(this.organization).subscribe(data => {
        console.log(data)
        console.log('here');
        this.students$ = data;

        this.displayTable = true;
        
      });
    // this.courseService.getCourses().subscribe((courses) =>{
    //   this.courses$ = courses;
    //   for(let course of this.courses$){
    //     this.instructorService.getInstructorByID(course.instructor).subscribe( (instructor) =>{
    //       instructor = instructor[0];
    //       course.instructor = instructor.firstName + " " + instructor.lastName;
    //     });
    //   }
    //   this.displayTable = true;
    // })
  }
}
