import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.css']
})
export class UploadLessonComponent implements OnInit{
  courseID!:string|null;
  sections!:any;
  constructor(private route:ActivatedRoute, private courseService: CourseService){}
  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('id');
    if(this.courseID){
      this.courseService.getCourseByID(this.courseID).subscribe( (res) =>{
        this.sections = res[0].sections;
      })
    }
  }
}
