import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css']
})
export class CourseCurriculumComponent implements OnInit {
  panelOpenState = false;
  @Input() curriculum!:any;
  @Input() id!: string;

  ngOnInit(): void{
  }

  navigate(title:string, section:number, lesson:number){
    if(section!=-1 && lesson!=-1){
      location.href="http://localhost:4200/course/"+this.id+"/"+ title+"/"+section+"/"+lesson;
    }
  }
  
}
