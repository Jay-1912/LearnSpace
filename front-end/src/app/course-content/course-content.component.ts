import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit, OnChanges {
  id!:string;
  title!:string;
  showFiller = false;
  sections!:any;
  src!:any;
  section:number = 0;
  lesson:number = 0;
  lessonName:string = "";
  type:string = "";
  prevSection!:number;
  prevLesson!:number;
  nextSection!:number;
  nextLesson!:number;
  constructor(private route:ActivatedRoute, private courseService:CourseService, private authService:AuthenticationService){}

  ngOnInit(): void{
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }

    this.id = this.route.snapshot.paramMap.get('id') || "";
    this.section = parseInt(this.route.snapshot.paramMap.get('section') || "");
    this.lesson = parseInt(this.route.snapshot.paramMap.get("lesson") || "");
    this.courseService.getCourseByID(this.id).subscribe((course) =>{
      course = course[0];
      this.title = course.title;
      this.sections = course.sections;
      this.lessonName = this.sections[this.section].lesson[this.lesson].title;
      this.src = this.sections[this.section].lesson[this.lesson].file;
      this.type = this.sections[this.section].lesson[this.lesson].type;

      if(this.lesson==0){
        if(this.section>0){
          this.prevSection = this.section-1;
          this.prevLesson = this.sections[this.prevSection].lesson.length-1;
          this.title = this.sections[this.prevSection].title;
        }else{
          this.prevSection = -1;
        }
      }else{
        this.prevSection = this.section;
        this.prevLesson = this.lesson - 1;
      }

      if(this.lesson==this.sections[this.section].lesson.length-1){
        if(this.section<this.sections.length-1){
          this.nextSection = this.section+1;
          this.nextLesson = 0;
          this.title = this.sections[this.nextSection].title;
        }else{
          this.nextSection = -1;
          this.nextLesson = -1;
        }
      }else{
        this.nextSection = this.section;
        this.nextLesson = this.lesson + 1;
      }

      console.log(this.prevLesson, this.prevSection);
      console.log(this.nextLesson, this.nextSection);
    })
  }

  navigate(section:number, lesson:number){
    if(section!=-1 && lesson!=-1){
      location.href="http://localhost:4200/course/"+this.id+"/"+this.title+"/"+section+"/"+lesson;
    }
  }

  navigatePrev(section:number, lesson:number){

  }

  ngOnChanges() {
    
  }
}
