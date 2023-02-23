import { Component, OnInit } from '@angular/core';
import { ICourse } from '../shared/interface';

@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.css']
})
export class CourseDescriptionComponent implements OnInit {
  title:string = "Learn Bootstrap for free";
  instructor:string = "John Adam";

  ngOnInit(): void{
    
  }
}
