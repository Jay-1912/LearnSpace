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
  id:number = 0;

  constructor(private instructorService:InstructorService){}

  ngOnInit(){
    if(this.course){
      this.title = Object(this.course)["title"];

      this.instructorService.getInstructors().subscribe((instructors:IInstructor[])=>{
        let i = instructors.find((inst) => inst.id == Object(this.course)["instructor"]);
        this.instructorName = i?.name;
      })
      this.instructor = Object(this.course)["instructor"];
      this.progress = Object(this.course)["progress"];
      this.id = Object(this.course)["id"];
    }
  }
}
