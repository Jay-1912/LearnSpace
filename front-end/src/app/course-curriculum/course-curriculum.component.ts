import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css']
})
export class CourseCurriculumComponent implements OnInit {
  panelOpenState = false;
  @Input() curriculum!:any;
  @Input() id!: string|null;
  @Input() isManage:boolean = false;

  @Output() handleEditlessonEvent = new EventEmitter<any>();
  @Output() handleDeletelessonEvent = new EventEmitter<any>();
  ngOnInit(): void{
  }

  navigate(title:string, section:number, lesson:number){
    if(section!=-1 && lesson!=-1){
      location.href="http://localhost:4200/course/"+this.id+"/"+ title+"/"+section+"/"+lesson;
    }
  }

  handleEditLesson(section:number, lesson:number){
    this.handleEditlessonEvent.emit({section, lesson});
  }

  handleDeleteLesson(section:number, lesson:number){
    this.handleDeletelessonEvent.emit({section, lesson});
  }
  
}
