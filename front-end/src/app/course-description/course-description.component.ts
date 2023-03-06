import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private courseService:CourseService, private instructorService:InstructorService){}

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.courseService.getCourseByID(this.id).subscribe((course) =>{
      course = course[0];
      this.title = course.title;
      this.instructor = course.instructor;
      this.id = course._id;
      this.curriculum = course.sections;
      this.overview = course.overview;
    });
  }
}
