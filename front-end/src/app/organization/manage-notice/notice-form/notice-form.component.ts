import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticeService } from 'src/app/services/notice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css']
})
export class NoticeFormComponent implements OnInit {
  constructor(private route:ActivatedRoute,private authService:AuthenticationService,private _snackBar: MatSnackBar, private noticeService: NoticeService){}
  loggedInUserId!:string;
  loggedInUserRole!:number;
  id!:any;

  noticeForm = new FormGroup({
    title: new FormControl("", Validators.required),
    organization: new FormControl("", Validators.required)
  })

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  saveNotice(event: Event){
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", this.noticeForm.controls["title"].value || "");
    formData.append("organization", this.loggedInUserId);
    this.noticeService.postNotice(formData).subscribe((res)=>{
      this.openSnackBar(res.message, "close");
    })
  }

  updateNotice(event: Event){
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", this.noticeForm.controls["title"].value || "");
    this.noticeService.updateNotice(this.id,formData).subscribe((res)=>{
      this.openSnackBar(res.message, "close");
    })
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

    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.noticeService.getNoticeById(this.id).subscribe((res)=>{
        let notice = res.notice;
        console.log(res);
        this.noticeForm.controls["title"].setValue(notice.title);
      })
    }
  }
}
