import { Component, Input, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { ICourse, IInstructor } from '../shared/interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!:object;
  @Input() enroll!:Boolean;
  title:string = "";
  instructor!:number;
  instructorName:string|undefined="";
  progress:number = 0;
  id:string = "";

  constructor(private instructorService:InstructorService){}

  ngOnInit(){
    if(this.course){
      this.id = Object(this.course)["_id"];
      this.title = Object(this.course)["title"];
      this.instructorService.getInstructorByID(Object(this.course)["instructor"]).subscribe((instructor)=>{
        this.instructorName = instructor[0].firstName + " " + instructor[0].lastName;
      })
      this.instructor = Object(this.course)["instructor"];
      this.progress = Object(this.course)["progress"];
    }
  }
}
