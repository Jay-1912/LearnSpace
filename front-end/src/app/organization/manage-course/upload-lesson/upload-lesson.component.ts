import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.css']
})
export class UploadLessonComponent implements OnInit{
  @ViewChild("file") file:any;
  
  courseID!:string|null;
  sections!:any;
  constructor(private route:ActivatedRoute, private courseService: CourseService){}

  lessonForm = new FormGroup({
    section: new FormControl(this.sections, Validators.required),
    title: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
    file: new FormControl("", Validators.required)
  })


  saveLesson(event: Event){

    let formData = new FormData();
    formData.append("courseID", this.courseID || "");
    formData.append("section", this.lessonForm.controls["section"].value);
    formData.append("title", this.lessonForm.controls["title"].value || "");
    formData.append("type", this.lessonForm.controls["type"].value || "");
    formData.append("file", this.file.nativeElement.files[0]);
    this.courseService.postLesson(formData).subscribe( (res)=>{
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.courseID = this.route.snapshot.paramMap.get('id');
    if(this.courseID){
      this.courseService.getCourseByID(this.courseID).subscribe( (res) =>{
        this.sections = res[0].sections;
        this.lessonForm.controls["section"].setValue(this.sections[0].title);
      })
    }
  }
}
