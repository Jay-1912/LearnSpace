import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,private route:ActivatedRoute, private authService:AuthenticationService){}

  id!:any;
  token!:any;
  role!:any;

  resetPasswordForm = new FormGroup({
    password: new FormControl("", Validators.required)
  })

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleSubmit(event: Event){
    event.preventDefault();
    let password = this.resetPasswordForm.controls["password"].value;
    this.authService.resetPassword({id:this.id, role: this.role, password: password}).subscribe((res)=>{
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
    this.role = localStorage.getItem("forgetPasswordUserRole");
    this.authService.verifyToken({id:this.id, role:this.role, token:this.token}).subscribe((res)=>{
      if(res.code==200){
        this.openSnackBar(res.message,"close");
      }else{
        this.openSnackBar(res.message, "close");
      }
    })
  }

}
