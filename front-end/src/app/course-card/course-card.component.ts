import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { InstructorService } from '../services/instructor.service';
import { StudentServicesService } from '../services/student-services.service';
import { ICourse, IInstructor } from '../shared/interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit, OnChanges {
  @Input() course!:object;
  @Input() enroll!:Boolean;
  title:string = "";
  instructor!:number;
  instructorName:string|undefined="";
  progress:number = 0;
  id:string = "";
  src:string = "";
  loggedInUserId:string = "";

  constructor(private authService:AuthenticationService,private studentService:StudentServicesService,private instructorService:InstructorService){}

  ngOnInit(){
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
    }

    if(this.course){
      this.id = Object(this.course)["_id"];
      this.title = Object(this.course)["title"];
      this.instructorService.getInstructorByID(Object(this.course)["instructor"]).subscribe((instructor)=>{
        this.instructorName = instructor[0].firstName + " " + instructor[0].lastName;
      })
      this.instructor = Object(this.course)["instructor"];
      this.progress = Object(this.course)["progress"];
      this.src = "http://localhost:3000/images/"+Object(this.course)["thumbnail"];
    }

    if(this.enroll==true){
      this.studentService.getStudentProgress(this.loggedInUserId, this.id).subscribe( (res)=>{
        this.progress=res.progress;
      } )
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.loggedInUserId, this.id);
    // if(this.enroll==true){
    //   this.studentService.getStudentProgress(this.loggedInUserId, this.id).subscribe( (res)=>{
    //     console.log(res);
    //   } )
    // }
  }
}
