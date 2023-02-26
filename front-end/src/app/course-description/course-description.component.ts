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
  instructor!:number;
  id:number|string|null = 0;
  enrolled:number = 0;
  curriculum!:any;
  overview:string="";
  constructor(private route: ActivatedRoute, private courseService:CourseService, private instructorService:InstructorService){}

  ngOnInit(): void{
    this.id = this.route.snapshot.paramMap.get('id');
    this.courseService.getCourses().subscribe( (courses:ICourse[]) =>{
      let course = courses.find(course => course.id==this.id);
      if(course){
        this.title = course.title;
        this.enrolled = course.enrolled;
        this.curriculum = course.curriculum;
        this.overview = course.overview;
        this.instructor = course.instructor;
      }
    });
  }
}
