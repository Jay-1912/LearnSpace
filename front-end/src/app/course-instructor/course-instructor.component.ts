import { Component, Input, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { IInstructor } from '../shared/interface';

@Component({
  selector: 'app-course-instructor',
  templateUrl: './course-instructor.component.html',
  styleUrls: ['./course-instructor.component.css']
})
export class CourseInstructorComponent implements OnInit{
  @Input() instructor!:number|undefined;

  constructor(private instructorService:InstructorService){}
  name!:string|undefined;
  about!:string|undefined;
  ngOnInit(): void{
    this.instructorService.getInstructors().subscribe((instructors:IInstructor[])=>{
      let i = instructors.find((inst) => inst.id == this.instructor);
      this.name =i?.name;
      this.about = i?.about;
    })
  }
}
