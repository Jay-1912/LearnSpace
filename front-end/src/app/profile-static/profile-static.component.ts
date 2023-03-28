import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { InstructorService } from '../services/instructor.service';
import { StudentServicesService } from '../services/student-services.service';

@Component({
  selector: 'app-profile-static',
  templateUrl: './profile-static.component.html',
  styleUrls: ['./profile-static.component.css']
})
export class ProfileStaticComponent implements OnInit{
  constructor(private instructorService:InstructorService, private courseService: CourseService,private route:ActivatedRoute, private studentService:StudentServicesService){}
  
  id!:any;
  imageSrc!:any;
  name!:any;
  email!:any;
  phone!:any;
  courses:any[] = [];

  slideIndex:number = 1;
  slides!:HTMLCollection;

  plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

  showSlides(n:number){
    let i;
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (i = 0; i < this.slides.length; i++) {
      this.slides[i].setAttribute("style","display:none")
    }
    this.slides[this.slideIndex-1]?.setAttribute("style","display:block");
  }


  ngOnInit(){

    this.slides = document.getElementsByClassName("course-item");

    this.showSlides(this.slideIndex);

    if(this.route.snapshot.paramMap.get('id')){
      this.id = this.route.snapshot.paramMap.get('id');
      this.studentService.getStudentById(this.id).subscribe((res)=>{
        res = res[0];
        this.imageSrc = "http://localhost:3000/images/"+res.profile;
        this.name = res.firstName + " " + res.lastName;
        this.email = res.email;
        this.phone = res.phone;
        if(res.enrolled_courses){
          let courseIds = Object.keys(res.enrolled_courses);
          console.log(courseIds);
          for(let i of courseIds){
            this.courseService.getCourseByID(i).subscribe((c)=>{
              c = c[0];
              this.instructorService.getInstructorByID(c.instructor).subscribe((i)=>{
                i = i[0];
                c.instructor = i.firstName + " " + i.lastName;
              })
              this.studentService.getStudentProgress(res._id, c._id).subscribe((p)=>{
                if(p.progress)
                  c.progress = p.progress;
                else
                  c.progress = 0;
              })
              this.courses.push(c);
              console.log(this.courses);
            })
          }
        }
      })
    }
  }

}
