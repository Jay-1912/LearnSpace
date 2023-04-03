import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { AuthenticationService } from './services/authentication.service';
import { StudentServicesService } from './services/student-services.service';
import { InstructorService } from './services/instructor.service';
import { SuperAdminService } from './services/super-admin.service';
import { OrganizationService } from './services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private courseService:CourseService, private socketService:SocketService, private authService:AuthenticationService, private studentService:StudentServicesService, private instructroService:InstructorService, private adminService:SuperAdminService, private organizationService:OrganizationService) {}
  loggedInUserId!:string;
  loggedInUserRole!:number;
  user!:any;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  connectSocket(){
    this.socketService.listen("new_notification").subscribe((res:any)=>{
      // {data, type}
      if(this.loggedInUserRole!=0){
        if(res.data.organization === this.user._id || res.data.organization === this.user.organization){
          if(res.type === "add_course"){
            this.openSnackBar("New course is added in your organization: "+res.data.title, "close");
          }
        }
      }
    })
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }

      if(this.loggedInUserRole==0){
        this.adminService.getSuperAdminById(this.loggedInUserId).subscribe((res)=>{
          this.user = res.admin;
        })
      }else if(this.loggedInUserRole==1){
        this.organizationService.getOrganizationById(this.loggedInUserId).subscribe((res)=>{
          this.user = res[0];
        })
      }else if(this.loggedInUserRole==2){
        this.instructroService.getInstructorByID(this.loggedInUserId).subscribe((res)=>{
          this.user = res[0];
        })
      }else{
        this.studentService.getStudentById(this.loggedInUserId).subscribe((res)=>{
          this.user = res[0];
        })
      }
  
      this.connectSocket();
    }
  }

  title = 'LearnSpace';

}
