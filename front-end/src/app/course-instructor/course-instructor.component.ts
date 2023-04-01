import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { IInstructor } from '../shared/interface';

@Component({
  selector: 'app-course-instructor',
  templateUrl: './course-instructor.component.html',
  styleUrls: ['./course-instructor.component.css']
})
export class CourseInstructorComponent implements OnInit, OnChanges{
  @Input() instructor!:string;

  constructor(private instructorService:InstructorService){}
  name!:string|undefined;
  about!:string|undefined;
  src!:string;
  ngOnInit(): void{
  }

  ngOnChanges(){
    if(this.instructor){
      this.instructorService.getInstructorByID(this.instructor).subscribe((instructor) =>{
        instructor = instructor[0];
        this.name = instructor.firstName + " " + instructor.lastName;
        this.src = "http://localhost:3000/images/"+instructor.profile;
        this.about = instructor.about;
      });
    }
  }
}
