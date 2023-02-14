import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../shared/interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!:object;
  
  title:string = "";
  instructor:string = "";
  progress:number = 0;

  ngOnInit(){
    if(this.course){
      this.title = Object(this.course)["title"];
      this.instructor = Object(this.course)["instructor"];
      this.progress = Object(this.course)["progress"];
    }
  }
}
