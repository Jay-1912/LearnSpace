import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { StudentServicesService } from 'src/app/services/student-services.service';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnInit {
  constructor(private authService:AuthenticationService, private organizationService:OrganizationService, private studentService:StudentServicesService, private courseService:CourseService, private instructorService:InstructorService){}
  loggedInUserId!:string;
  loggedInUserRole!:number;
  totalOrganizations: number = 0;
  totalCourses: number = 0;
  totalInstructors: number = 0;
  totalStudents: number = 0; 
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }

    if(this.loggedInUserRole == 0){
      this.organizationService.getOrganization().subscribe((res)=>{
        this.totalOrganizations = res.length;
      })

      this.studentService.getStudents().subscribe((res)=>{
        this.totalStudents = res.length;
      })

      this.courseService.getCourses().subscribe((res)=>{
        this.totalCourses = res.length;
      })

      this.instructorService.getInstructors().subscribe((res)=>{
        this.totalInstructors = res.length;
      })

    }else if(this.loggedInUserRole == 1){
      this.studentService.getStudentsByOrg(this.loggedInUserId).subscribe((res)=>{
        this.totalStudents = res.length;
      })

      this.courseService.getCoursesByOrg(this.loggedInUserId).subscribe((res)=>{
        this.totalCourses = res.length;
      })

      this.instructorService.getInstructors().subscribe((res)=>{
        let temp = res.filter((instructor:any)=>{
          return instructor.organization === this.loggedInUserId;
        })
        this.totalInstructors = temp.length;
      })
    }else{
      this.courseService.getCourses().subscribe((res)=>{
        let temp = res.filter((course:any)=>{
          return course.instructor === this.loggedInUserId;
        })
        this.totalCourses = temp.length;
      })
    }
  }
}
