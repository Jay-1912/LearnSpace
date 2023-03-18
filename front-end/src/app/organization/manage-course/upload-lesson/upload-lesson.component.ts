import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.css']
})
export class UploadLessonComponent implements OnInit{
  @ViewChild("file") file:any;
  
  courseID!:any;
  sections!:any;
  url!:any;
  isEdit: boolean = false;
  editedSection!: any;
  editedLesson!: any;
  constructor(private authService:AuthenticationService ,private changeDetectorRefs:ChangeDetectorRef, private route:ActivatedRoute, private courseService: CourseService, private sanitizer:DomSanitizer){}

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
      this.sections = res.sections;
      this.changeDetectorRefs.detectChanges();
    });
  }

  updateLesson(event: Event){
    let formData = new FormData();
    formData.append("courseID", this.courseID || "");
    formData.append("section", this.editedSection);
    formData.append("lesson", this.editedLesson);
    formData.append("title", this.lessonForm.controls["title"].value || "");
    formData.append("type", this.lessonForm.controls["type"].value || "");

    if(this.file.nativeElement.files[0]){
      formData.append("file", this.file.nativeElement.files[0]);
    }else{
      formData.append("file", this.lessonForm.controls["file"].value || "");
    }
    this.courseService.updateLesson(formData).subscribe((res)=>{
      console.log(res);
      this.sections = res.sections;
      this.changeDetectorRefs.detectChanges();
      this.isEdit = false;
    });
  }

  deleteLesson(lesson: any){
    console.log(lesson);
    let formData = new FormData();
    formData.append("courseID", this.courseID || "");
    formData.append("section", lesson.section);
    formData.append("lesson", lesson.lesson);
    this.courseService.deleteLesson(formData).subscribe( (res)=>{
      console.log(res);
      this.sections = res.sections;
      this.changeDetectorRefs.detectChanges();
    })
  }

  setFormValues(lesson:any){
    this.isEdit = true;
    this.editedLesson = lesson.lesson;
    this.editedSection = lesson.section;
    this.lessonForm.controls["section"].setValue(this.sections[lesson.section].title);
    this.lessonForm.controls["title"].setValue(this.sections[lesson.section].lesson[lesson.lesson].title);
    this.lessonForm.controls["type"].setValue(this.sections[lesson.section].lesson[lesson.lesson].type);
    this.lessonForm.controls["file"].setValue(this.sections[lesson.section].lesson[lesson.lesson].file);
    this.url = "http://localhost:3000/images/"+ this.sections[lesson.section].lesson[lesson.lesson].file;
  }

  onFileChanged(event:Event) {
    const files =  this.file.nativeElement.files;
    if (files.length === 0)
        return;
    const reader = new FileReader();
    // this.imagePath = files;

    reader.onload = (_event) => { 
      var blob = new Blob(files, { type: files[0].type });
      var tempUrl = URL.createObjectURL(blob);
      this.url =  this.sanitizer.bypassSecurityTrustUrl(tempUrl);
    }

    reader.readAsDataURL(files[0]);

  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }
    this.courseID = this.route.snapshot.paramMap.get('id');
    if(this.courseID){
      this.courseService.getCourseByID(this.courseID).subscribe( (res) =>{
        this.sections = res[0].sections;
        this.lessonForm.controls["section"].setValue(this.sections[0].title);
      })
    }
  }
}
