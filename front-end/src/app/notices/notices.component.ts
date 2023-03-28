import { Component, OnChanges, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';
import { INotice } from 'src/app/shared/interface';
import { AuthenticationService } from '../services/authentication.service';
import { StudentServicesService } from '../services/student-services.service';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit, OnChanges {
  notices!:any[];
  constructor(private studentService:StudentServicesService,private authService:AuthenticationService,private noticeServise:NoticeService){}
  loggedInUserId!:string;
  loggedInUserRole!:number;

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }
    if(this.loggedInUserId){
      this.studentService.getStudentById(this.loggedInUserId).subscribe((res)=>{
        res = res[0];
        let organization = res.organization;
        this.noticeServise.getNotices().subscribe((res)=>{
          this.notices = res.notices.filter((notice:any)=>{
            return notice.organization === organization;
          });
        })
      })
    }
  }

  ngOnChanges(){
    
  }
}
