import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrganizationService } from 'src/app/services/organization.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private authService:AuthenticationService, private organizationService:OrganizationService, private route: ActivatedRoute){}

  @ViewChild('organizationName') organizationName: any;
  @ViewChild('organizationEmail') organizationEmail: any;
  @ViewChild('organizationPassword') organizationPassword: any;
  @ViewChild('organizationConfirmPassword') organizationConfirmPassword: any;
  @ViewChild('organizationImage') organizationImage:any;
  @ViewChild('file') imageFile:any;

  image!:any;
  id!:any;

  OrganizationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  setPreview(event:Event){
    const files = this.imageFile.nativeElement.files;
    if(files.length==0) return;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) =>{
      this.image = reader.result;
    }
  }


  comparePassword(){
    let password = this.OrganizationForm.controls["password"].value;
    let confirmPassword = this.OrganizationForm.controls["confirmPassword"].value;

    if(password!=confirmPassword){
      this.organizationConfirmPassword.nativeElement.style.display = "block";
    }
  }

  saveOrganization(event:Event){
    event.preventDefault();

    let name = this.OrganizationForm.controls["name"].value;
    let email = this.OrganizationForm.controls["email"].value;
    let password = this.OrganizationForm.controls["password"].value;
    let confirmPassword = this.OrganizationForm.controls["confirmPassword"].value;

    if(name==""){
      this.organizationName.nativeElement.style.display = "block";
    }

    if(email==""){
      this.organizationEmail.nativeElement.style.display = "block";
    }

    if(password==""){
      this.organizationPassword.nativeElement.style.display = "block";
    }

    

    if(name!="" && email!="" && password!="" && password==confirmPassword){
      this.organizationName.nativeElement.style.display = "none";
      this.organizationEmail.nativeElement.style.display = "none";
      this.organizationPassword.nativeElement.style.display = "none";
      this.organizationConfirmPassword.nativeElement.style.display = "none";
      let selectedFile = this.imageFile.nativeElement.files[0];
      
      let formData = new FormData();
      formData.append("name", this.OrganizationForm.controls["name"].value || "");
      formData.append("email", this.OrganizationForm.controls["email"].value || "");
      formData.append("password", this.OrganizationForm.controls["password"].value || "");
      formData.append("file", selectedFile);

      this.organizationService.postOrganization(formData).subscribe( (res)=>{
        console.log(res);
        this.openSnackBar("Organization added successfully", "close");
      } )
    }
    
  }

  updateOrganization(event: Event){
    event.preventDefault();

    let name = this.OrganizationForm.controls["name"].value;
    let email = this.OrganizationForm.controls["email"].value;
    let password = this.OrganizationForm.controls["password"].value;
    let confirmPassword = this.OrganizationForm.controls["confirmPassword"].value;

    if(name==""){
      this.organizationName.nativeElement.style.display = "block";
    }

    if(email==""){
      this.organizationEmail.nativeElement.style.display = "block";
    }

    if(password==""){
      this.organizationPassword.nativeElement.style.display = "block";
    }

    if(name!="" && email!="" && password!="" && password==confirmPassword){
      this.organizationName.nativeElement.style.display = "none";
      this.organizationEmail.nativeElement.style.display = "none";
      this.organizationPassword.nativeElement.style.display = "none";
      this.organizationConfirmPassword.nativeElement.style.display = "none";
      let selectedFile = this.imageFile.nativeElement.files[0];
      
      let formData = new FormData();
      formData.append("name", this.OrganizationForm.controls["name"].value || "");
      formData.append("email", this.OrganizationForm.controls["email"].value || "");
      formData.append("password", this.OrganizationForm.controls["password"].value || "");
      if(selectedFile){
        formData.append("file", selectedFile);
      }else{
        formData.append("file", this.OrganizationForm.controls["image"].value || "");
      }

      this.organizationService.updateOrganization(this.id,formData).subscribe( (res)=>{
        console.log(res);
        this.openSnackBar("Organization updated successfully", "close");
      } )
    }
  }

  ngOnInit(): void{
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.organizationService.getOrganizationById(this.id).subscribe( (res)=>{
        let organization = res[0];
        this.OrganizationForm.controls["name"].setValue(organization.name);
        this.OrganizationForm.controls["email"].setValue(organization.email);
        this.OrganizationForm.controls["password"].setValue(organization.password);
        this.OrganizationForm.controls["image"].setValue(organization.image);
        this.image = "http://localhost:3000/images/"+organization.image;
      })
    }
  }
  
}
