import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { OrganizationService } from 'src/app/services/organization.service';
import { TeacherServicesService } from 'src/app/services/teacher-services.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private teacherService: TeacherServicesService,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sections: any[] = [];
  image: any = '';
  loggedInUserId!:string;
  loggedInUserRole!:number;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
 

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
  @ViewChild('instructorSelector') instructorSelector: any;

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    overview: new FormControl(''),
    thumbnail: new FormControl(),
    section: new FormControl(),
    sections: new FormControl(),
    organization: new FormControl(),
    instructor: new FormControl(),
  });

  tempSections: string[] = [];
  instructors: any[] = [];
  organizations: any[] = [];
  id: string = '';

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
        this.courseForm.controls['organization'].setValue(this.loggedInUserId);
        let selectedOrg = this.courseForm.controls["organization"].value;
        this.teacherService.getTeachersByOrg(selectedOrg).subscribe((res)=>{
          this.instructors = res;
        })
      }else{
        this.courseForm.controls['instructor'].setValue(this.loggedInUserId);
        this.instructorService.getInstructorByID(this.loggedInUserId).subscribe((res)=>{
          res = res[0];
          this.courseForm.controls['organization'].setValue(res.organization);
        })
      }
    }

    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.courseService.getCourseByID(this.id).subscribe((course) => {
        course = course[0];
        this.courseForm.controls['title'].setValue(course.title);
        this.courseForm.controls['overview'].setValue(course.overview);
        this.courseForm.controls['thumbnail'].setValue(course.thumbnail);
        this.courseForm.controls['organization'].setValue(course.organization);
        this.image = 'http://localhost:3000/images/' + course.thumbnail; 
        this.sections = course.sections;
        this.teacherService.getTeachersByOrg(course.organization).subscribe((res)=>{
          this.instructors = res;
        });
        this.courseForm.controls['instructor'].setValue(course.instructor);
      });
    }

    this.organizationService.getOrganization().subscribe((res)=>{
      this.organizations = res;
    });
  }

  handleChangeOrganization(event: Event){
    let selectedOrg = this.courseForm.controls["organization"].value;
    this.teacherService.getTeachersByOrg(selectedOrg).subscribe((res)=>{
      this.instructors = res;
    })
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
    formData.append('organization', course.organization);
    formData.append('instructor', course.instructor);
    this.courseService.postCourse(formData).subscribe((res) => {
      console.log(res);
      let navigationURL =
        'http://localhost:4200/admin/manage-course/' +
        res._id +
        '/upload-lesson';
      window.location.href = navigationURL;
      this.openSnackBar("Course added successfully", "close");
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
    formData.append('organization', course.organization);
    formData.append('instructor', course.instructor);
    this.courseService.updateCourse(this.id, formData).subscribe((res) => {
      console.log(res);
      let navigationURL =
        'http://localhost:4200/admin/manage-course/' +
        res._id +
        '/upload-lesson';
      window.location.href = navigationURL;
      this.openSnackBar("Course updated successfully", "close");
    });
  }
}
