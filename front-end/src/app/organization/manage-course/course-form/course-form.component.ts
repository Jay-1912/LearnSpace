import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private route: ActivatedRoute
  ) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sections: any[] = [];
  image: any = '';

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.sections.push({ title: value, lesson: [] });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(section: any): void {
    const index = this.sections.indexOf(section);

    if (index >= 0) {
      this.sections.splice(index, 1);
    }
  }

  edit(section: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove section if it no longer has a name
    if (!value) {
      this.remove(section);
      return;
    }

    // Edit existing section
    const index = this.sections.indexOf(section);
    if (index >= 0) {
      this.sections[index].title = value;
    }
  }

  @ViewChild('thumbnail') thumbnail: any;

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    overview: new FormControl(''),
    thumbnail: new FormControl(),
    section: new FormControl(),
    sections: new FormControl(),
    instructor: new FormControl(),
  });

  tempSections: string[] = [];
  instructors: any[] = [];
  id: string = '';

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.courseService.getCourseByID(this.id).subscribe((course) => {
        course = course[0];
        this.courseForm.controls['title'].setValue(course.title);
        this.courseForm.controls['overview'].setValue(course.overview);
        this.courseForm.controls['thumbnail'].setValue(course.thumbnail);
        this.image = 'http://localhost:3000/images/' + course.thumbnail;
        this.sections = course.sections;
        this.courseForm.controls['instructor'].setValue(course.instructor);
      });
    }

    this.instructorService.getInstructors().subscribe((instructors) => {
      this.instructors = instructors;
      console.log(this.instructors);
    });
  }

  onFileChanged(event: Event) {
    const files = this.thumbnail.nativeElement.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    };
  }

  saveCourse(event: Event) {
    event.preventDefault();
    let selectedFile = this.thumbnail.nativeElement.files[0];
    let course = this.courseForm.value;
    // let sections = [];
    // for(let section of this.tempSections){
    //   sections.push({"title":section.trim(), "lesson":[]});
    // }
    const formData = new FormData();
    formData.append('title', course.title || '');
    formData.append('overview', course.overview || '');
    formData.append('thumbnail', selectedFile);
    formData.append('sections', JSON.stringify(this.sections));
    formData.append('instructor', course.instructor);
    this.courseService.postCourse(formData).subscribe((res) => {
      console.log(res);
      let navigationURL =
        'http://localhost:4200/organization/manage-course/' +
        res._id +
        '/upload-lesson';
      window.location.href = navigationURL;
    });
  }

  updateCourse(event: Event) {
    event.preventDefault();
    let selectedFile = this.thumbnail.nativeElement.files[0];
    let course = this.courseForm.value;
    const formData = new FormData();
    formData.append('title', course.title || '');
    formData.append('overview', course.overview || '');
    if (selectedFile) {
      formData.append('thumbnail', selectedFile);
    } else {
      formData.append('thumbnail', course.thumbnail);
    }
    formData.append('sections', JSON.stringify(this.sections));
    formData.append('instructor', course.instructor);
    this.courseService.updateCourse(this.id, formData).subscribe((res) => {
      console.log(res);
      let navigationURL =
        'http://localhost:4200/organization/manage-course/' +
        res._id +
        '/upload-lesson';
      window.location.href = navigationURL;
    });
  }
}
