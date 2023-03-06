import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ICourse } from 'src/app/shared/interface';
import { ElementRef } from '@angular/core';

import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from '../services/instructor.service';

@Component({
  selector: 'app-course-carousel',
  templateUrl: './course-carousel.component.html',
  styleUrls: ['./course-carousel.component.css']
})
export class CourseCarouselComponent implements OnInit, OnChanges {
  courses!:ICourse[];
  slideIndex:number = 1;
  slides!:HTMLCollection;

  @ViewChild('courseItem') el!: ElementRef;

  constructor(private courseService:CourseService, private instructorService: InstructorService) {}

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
    this.courseService.getCourses().subscribe(
      ((courses:ICourse[]) => {
        this.courses=courses;
      })
    );
    this.slides = document.getElementsByClassName("course-item");

    this.showSlides(this.slideIndex);
    
  }

  ngOnChanges(){
  }

}
