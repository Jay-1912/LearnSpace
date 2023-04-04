import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private authenticationService:AuthenticationService, private _snackBar: MatSnackBar) {}

  loginForm = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
    'role': new FormControl()
  })

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleLogin(){
    let formData = new FormData();
    let loginData = this.loginForm.value;
    formData.append('email', loginData.email || "");
    formData.append('password', loginData.password || "");
    formData.append('role', loginData.role || "");
    this.authenticationService.login(formData).subscribe( (res)=>{
      if(res.status==400){
        this.openSnackBar(res.error, "close");
      }else{
        this.openSnackBar(res.success, "close");
        localStorage.setItem("loggedInID", res.user._id);
        localStorage.setItem("role", loginData.role);
        if(loginData.role==3){
          window.location.href = "http://localhost:4200/dashboard";
        }else{
          window.location.href = "http://localhost:4200/admin/dashboard";
        }
      }
    } )
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()){
      let role = parseInt(localStorage.getItem("role") || "");
      if(role==3){
        window.location.href = "http://localhost:4200/dashboard";
      }else{
        window.location.href = "http://localhost:4200/admin/dashboard";
      }
    }
  }

}
