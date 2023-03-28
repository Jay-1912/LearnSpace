import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CourseService } from '../services/course.service';
import { InstructorService } from '../services/instructor.service';
import { ICourse, IInstructor } from '../shared/interface';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {
  title:string = "";
  instructor:string="";
  id:string= "";
  enrolled:number = 0;
  curriculum!:any;
  overview:string="";
  src:string="";
  loggedInUserID!:string; 
  constructor(private _snackBar: MatSnackBar,private authService:AuthenticationService, private route: ActivatedRoute, private courseService:CourseService, private instructorService:InstructorService){}
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleEnroll(){
    this.courseService.enrollToCourse(this.id, this.loggedInUserID).subscribe( (res)=>{
      if(res.status==200){
        this.openSnackBar(res.message, "close");
      }else{
        this.openSnackBar(res.message, "close");
      }

      window.location.href ="http://localhost:4200/course/"+this.id+"/"+this.title+"/0/0";
    })
  }

  ngOnInit(): void{
    if(this.authService.isLoggedIn()){
      this.loggedInUserID = this.authService.isLoggedIn();
    }else{
        window.location.href = "http://localhost:4200";
    }

    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.courseService.getCourseByID(this.id).subscribe((course) =>{
      course = course[0];
      this.title = course.title;
      this.instructor = course.instructor;
      this.id = course._id;
      this.curriculum = course.sections;
      this.overview = course.overview;
      this.src="http://localhost:3000/images/"+course.thumbnail;
      if(course.enrolled_students){
        this.enrolled = course.enrolled_students.length;
      }
    });
  }
}
