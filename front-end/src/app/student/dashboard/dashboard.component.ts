import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentServicesService } from 'src/app/services/student-services.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private authService:AuthenticationService, private studentService:StudentServicesService, private courseService:CourseService){}
  loggedInUserId:string = "";
  enrolledCourse: any[] = [];
  name:string = "";
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
    }

    this.studentService.getStudentById(this.loggedInUserId).subscribe((student)=>{
      student = student[0];
      this.name = student.firstName + " " + student.lastName;
      for(let courseID of Object.keys(student.enrolled_courses)){
        this.courseService.getCourseByID(courseID).subscribe( (course)=>{
          course = course[0];
          this.enrolledCourse.push(course);
        })
      }
    })

  }
}
