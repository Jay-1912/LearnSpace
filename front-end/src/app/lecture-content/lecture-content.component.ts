import { Component, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { StudentServicesService } from '../services/student-services.service';


@Component({
  selector: 'app-lecture-content',
  templateUrl: './lecture-content.component.html',
  styleUrls: ['./lecture-content.component.css']
})
export class LectureContentComponent implements OnChanges {
  constructor(private route:ActivatedRoute, private authService:AuthenticationService, private studentService:StudentServicesService){}

  @Input() src!:string;
  @Input() type!:string;
  source!:string;
  loggedInUserId:string="";
  courseId:string="";
  section!:number;
  lesson!:number;

  updateProgress(){
    this.studentService.updateProgress(this.loggedInUserId, this.courseId, this.section, this.lesson).subscribe( (res)=>{
      console.log(res);
    } )
  }

  ngOnChanges(){
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
    }

    this.courseId = this.route.snapshot.paramMap.get('id') || "";
    this.section = parseInt(this.route.snapshot.paramMap.get('section') || "");
    this.lesson = parseInt(this.route.snapshot.paramMap.get("lesson") || "");
    this.source = "http://localhost:3000/images/"+this.src; 
  }
}
