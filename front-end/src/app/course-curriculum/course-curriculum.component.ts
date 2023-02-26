import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css']
})
export class CourseCurriculumComponent implements OnInit {
  panelOpenState = false;
  @Input() curriculum!:any;

  ngOnInit(): void{
    
  }
  
}
