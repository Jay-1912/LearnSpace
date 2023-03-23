import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CourseService } from '../services/course.service';
import { StudentServicesService } from '../services/student-services.service';
import { ICourse } from '../shared/interface';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {
  courses:any[]=[];
  loggedInUserId: string = "";
  enrolledCourses: any[] = [];

  constructor(private authService: AuthenticationService,private courseService:CourseService, private studentService:StudentServicesService){}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.loggedInUserId = this.authService.isLoggedIn();
    }else{
      window.location.href = "http://localhost:4200";
    }

    this.courseService.getCourses().subscribe(
      ((courses:any[]) => {
        this.studentService.getStudentById(this.loggedInUserId).subscribe( (student) =>{
          student = student[0];
          if(student.enrolled_courses){
            this.enrolledCourses = Object.keys(student.enrolled_courses);
          }
          if(this.enrolledCourses){
            for(let course of courses){
              if(this.enrolledCourses.includes(course._id)){
                course.enrolled = true;
              }else{
                course.enrolled = false;
              }
            }
          }

          this.courses = courses;
        });
      })
    );
    
    

    
  }
  
}
