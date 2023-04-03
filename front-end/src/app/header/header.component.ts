import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrganizationService } from '../services/organization.service';
import { StudentServicesService } from '../services/student-services.service';
import { SuperAdminService } from '../services/super-admin.service';
import { TeacherServicesService } from '../services/teacher-services.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private notificationService:NotificationService,private superAdminService:SuperAdminService ,private authService:AuthenticationService, private studentService:StudentServicesService, private teacherService:TeacherServicesService, private organizationService:OrganizationService){}


  navBarOpen: Boolean = false;
  notificationOverlayOpen: Boolean = false;
  loggedInUserId!: string;
  loggedInUserRole!: any;
  imgSrc:string = "";
  notifications:any[] = [];
  notificationCount:number = 0;

  handleNavBar() {
    this.navBarOpen = !this.navBarOpen;
  }

  handleNotificationOverlay(){
    this.notificationOverlayOpen = !this.notificationOverlayOpen;
    if(this.notificationOverlayOpen){
      if(this.loggedInUserRole==1){
        this.organizationService.getOrganizationById(this.loggedInUserId).subscribe((res)=>{
          this.notifications = res[0].unseen_notification.reverse();
        });
      }else if(this.loggedInUserRole==2){
        this.teacherService.getTeacherById(this.loggedInUserId).subscribe((res)=>{
          this.notifications = res[0].unseen_notification.reverse();
        });
      }else if(this.loggedInUserRole==3){
        this.studentService.getStudentById(this.loggedInUserId).subscribe((res)=>{
          this.notifications = res[0].unseen_notification.reverse();
        });
      }else{
        this.superAdminService.getSuperAdminById(this.loggedInUserId).subscribe((res)=>{
          this.notifications = res.admin.profile.unseen_notification.reverse();
        })
      }
    }else{
      this.notificationCount = 0;
      this.notificationService.seenNotifications({id:this.loggedInUserId, role:this.loggedInUserRole.toString()}).subscribe((res)=>{
        console.log(res);
      })
    }
  }

  handleLogout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.loggedInUserId = this.authService.isLoggedIn();
      this.loggedInUserRole = parseInt(localStorage.getItem("role") || "");
      if(this.loggedInUserRole==1){
        this.organizationService.getOrganizationById(this.loggedInUserId).subscribe((res)=>{
          this.imgSrc = "http://localhost:3000/images/"+res[0].image;
          this.notificationCount = res[0].unseen_notification.length;
        });
      }else if(this.loggedInUserRole==2){
        this.teacherService.getTeacherById(this.loggedInUserId).subscribe((res)=>{
          this.imgSrc = "http://localhost:3000/images/"+res[0].profile;
          this.notificationCount = res[0].unseen_notification.length;
        });
      }else if(this.loggedInUserRole==3){
        this.studentService.getStudentById(this.loggedInUserId).subscribe((res)=>{
          this.imgSrc = "http://localhost:3000/images/"+res[0].profile;
          this.notificationCount = res[0].unseen_notification.length;
        });
      }else{
        this.superAdminService.getSuperAdminById(this.loggedInUserId).subscribe((res)=>{
          this.imgSrc = "http://localhost:3000/images/"+res.admin.profile;
          this.notifications = res.admin.profile.unseen_notification.length;
        })
      }
    }
  } 

}
