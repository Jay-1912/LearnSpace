import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  constructor(private courseService: CourseService){}

  @ViewChild("thumbnail") thumbnail:any;
  courseForm = new FormGroup({
    title: new FormControl("", Validators.required),
    overview: new FormControl(""),
    thumbnail: new FormControl(),
    sections: new FormControl(),
  });

  tempSections:string[] = [];

  saveCourse(event: Event){
    event.preventDefault();
    let selectedFile = this.thumbnail.nativeElement.files[0];
    let course = this.courseForm.value;
    this.tempSections = course.sections.split(',');
    let sections = [];
    for(let section of this.tempSections){
      sections.push({"title":section.trim()});
    }
    console.log(this.tempSections);
    const formData = new FormData();
    formData.append("title", course.title || "");
    formData.append("overview", course.overview || "");
    formData.append("thumbnail", selectedFile);
    formData.append("sections", JSON.stringify(sections));

    this.courseService.postCourse(formData).subscribe( (res) =>{
      console.log(res);
      let navigationURL = "http://localhost:4200/organization/manage-course/"+res._id+"/upload-lesson";
      window.location.href = (navigationURL);
    })
  }

}
