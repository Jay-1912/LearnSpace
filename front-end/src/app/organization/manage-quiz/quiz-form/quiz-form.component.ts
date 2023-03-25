import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { QuizService } from 'src/app/services/quiz.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {

  constructor(private instructorService:InstructorService,private route: ActivatedRoute,private authService:AuthenticationService ,private _snackBar: MatSnackBar,private organizationService:OrganizationService, private courseService:CourseService, private quizService:QuizService){}

  @ViewChild('selectSectionLesson') selectSectionLesson:any;

  organizations:any[] = [];
  courses:any[] = [];
  sections: any[] = [];
  id:string = "";
  loggedInUserId!:string;
  loggedInUserRole!:number;
  

  quizForm = new FormGroup({
    title: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    section: new FormControl('',Validators.required)
  })

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleChangeOrganization(event: Event){
    let selectedOrg = this.quizForm.controls["organization"].value;
    this.courseService.getCoursesByOrg(selectedOrg).subscribe((res) =>{
      this.courses = res;
    });
  }

  handleChangeCourse(event: Event){
    let selectedCourse = this.quizForm.controls["course"].value;
    this.courseService.getCourseByID(selectedCourse || "").subscribe( (res)=>{
      console.log(res[0].sections);
      this.sections = res[0].sections;
    } )
  }

  saveQuiz(event: Event){
    event.preventDefault();
    let quiz = this.quizForm.value;
    const formData = new FormData();
    formData.append("title", quiz.title || "");
    formData.append("organization", quiz.organization || "");
    formData.append("course", quiz.course || "");
    // let section_lesson = quiz.section;
    // let section, lesson;
    // if(section_lesson){
    //   section = section_lesson[0];
    //   lesson = section_lesson[1];
    // }
    formData.append("section", quiz.section?.toString() || "" );
    // formData.append("lesson", lesson || "");

    this.quizService.postQuiz(formData).subscribe( (res)=>{
      if(res.code==200){
        this.openSnackBar(res.message, "close");
        let navigationURL =
        'http://localhost:4200/admin/manage-quiz/' +
        res.quiz._id +
        '/upload-question';
      window.location.href = navigationURL;
      }else{
        this.openSnackBar(res.message, "close");
      }
    } )

  }

  updateQuiz(event: Event){
    event.preventDefault();
    let quiz = this.quizForm.value;
    const formData = new FormData();
    formData.append("title", quiz.title || "");
    formData.append("organization", quiz.organization || "");
    formData.append("course", quiz.course || "");
    // let section_lesson = quiz.section;
    // let section, lesson;
    // if(section_lesson){
    //   section = section_lesson[0];
    //   lesson = section_lesson[1];
    // }
    formData.append("section", quiz.section || "" );
    // formData.append("lesson", lesson || "");

    this.quizService.updateQuiz(this.id, formData).subscribe( (res)=>{
      if(res.code==200){
        this.openSnackBar(res.message, "close");
        let navigationURL =
        'http://localhost:4200/admin/manage-quiz/' +
        res.quiz._id +
        '/upload-question';
      window.location.href = navigationURL;
      }else{
        this.openSnackBar(res.message, "close");
      }
    } )
  }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }else{
      this.loggedInUserId = this.authService.isLoggedIn();
      if(localStorage.getItem("role")!==null){
        this.loggedInUserRole = parseInt(localStorage.getItem("role") || '');
      }
    }

    if(this.loggedInUserRole!=0){
      if(this.loggedInUserRole==1){
        this.quizForm.controls["organization"].setValue(this.loggedInUserId);
        let selectedOrg = this.quizForm.controls["organization"].value;
        this.courseService.getCoursesByOrg(selectedOrg).subscribe((res) =>{
          this.courses = res;
        });
      }else{
        this.instructorService.getInstructorByID(this.loggedInUserId).subscribe( (res)=>{
          res = res[0];
          this.quizForm.controls["organization"].setValue(res.organization);
        })
        this.courseService.getCourses().subscribe((res)=>{
          this.courses = res.filter( (course:any) =>{
            return course.instructor == this.loggedInUserId;
          } )
        })
      }
    }

    this.organizationService.getOrganization().subscribe( (res)=>{
      this.organizations = res;
    })
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.quizService.getQuizById(this.id).subscribe((res)=>{
        let quiz = res.quiz;
        this.quizForm.controls["organization"].setValue(quiz.organization);
        let selectedOrg = this.quizForm.controls["organization"].value;
        this.courseService.getCoursesByOrg(selectedOrg).subscribe((res) =>{
          this.courses = res;
        });
        this.quizForm.controls["course"].setValue(quiz.course);
        let selectedCourse = this.quizForm.controls["course"].value;
        this.courseService.getCourseByID(selectedCourse || "").subscribe( (res)=>{
          console.log(res[0].sections);
          this.sections = res[0].sections;
        } )
        this.quizForm.controls["title"].setValue(quiz.title);
        this.quizForm.controls["section"].setValue(quiz.section);
      })
    }
  }
}
