import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CourseService } from '../services/course.service';
import { InstructorService } from '../services/instructor.service';
import { ICourse, IInstructor } from '../shared/interface';

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
  constructor(private authService:AuthenticationService, private route: ActivatedRoute, private courseService:CourseService, private instructorService:InstructorService){}

  ngOnInit(): void{
    if(this.authService.isLoggedIn()){
      this.loggedInUserID = this.authService.isLoggedIn();
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
    });
  }
}
