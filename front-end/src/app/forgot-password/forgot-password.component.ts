import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private _snackBar: MatSnackBar, private authService:AuthenticationService){}
  
  forgotPasswordForm = new FormGroup({
    email: new FormControl("", Validators.required)
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleSubmit(event:Event){
    event.preventDefault();
    let formData = new FormData();
    formData.append("email", this.forgotPasswordForm.controls["email"].value || "");
    this.authService.forgotPassword(formData).subscribe((res)=>{
      if(res.code==200){
        localStorage.setItem("forgetPasswordUserRole", res.role);
        // window.location.href="http://localhost:4200/reset-password/"+res.user[0]._id+"/"+res.token;
        this.openSnackBar(res.message, "close");
      }else if(res.code==201){
        this.openSnackBar(res.message, "close");
      }else{
        this.openSnackBar(res.message, "close");
      }
    })
  } 
}
