import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from 'src/app/services/super-admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-super-admin-form',
  templateUrl: './super-admin-form.component.html',
  styleUrls: ['./super-admin-form.component.css']
})
export class SuperAdminFormComponent implements OnInit {
  constructor(private route: ActivatedRoute,private _snackBar: MatSnackBar,private superAdminService:SuperAdminService){}

  @ViewChild('file') imageFile!: any;
  image!:any;
  id!:any;

  SuperAdminForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("",Validators.required),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    file: new FormControl("", Validators.required)
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

  updateSuperAdmin(event:Event){
    event.preventDefault();
    let selectedFile = this.imageFile.nativeElement.files[0];
    let formData = new FormData();
    formData.append("firstname", this.SuperAdminForm.controls["firstname"].value || "");
    formData.append("lastname", this.SuperAdminForm.controls["lastname"].value || "");
    formData.append("email", this.SuperAdminForm.controls["email"].value || "");
    formData.append("password", this.SuperAdminForm.controls["password"].value || "");
    formData.append("phone", this.SuperAdminForm.controls["phone"].value || "");
    if(selectedFile){
      formData.append("file", selectedFile);
    }else{
      formData.append("file", this.SuperAdminForm.controls["file"].value || "");
    }

    this.superAdminService.updateSuperAdmin(this.id, formData).subscribe((res)=>{
      this.openSnackBar(res.message, "close");
    })
  }

  saveSuperAdmin(event: Event){
    event.preventDefault();
      let selectedFile = this.imageFile.nativeElement.files[0];
      
      let formData = new FormData();
      formData.append("firstname", this.SuperAdminForm.controls["firstname"].value || "");
      formData.append("lastname", this.SuperAdminForm.controls["lastname"].value || "");
      formData.append("email", this.SuperAdminForm.controls["email"].value || "");
      formData.append("password", this.SuperAdminForm.controls["password"].value || "");
      formData.append("phone", this.SuperAdminForm.controls["phone"].value || "");
      formData.append("file", selectedFile);

      this.superAdminService.postSuperAdmin(formData).subscribe( (res)=>{
        this.openSnackBar(res.message, "close");
      })
  }


  ngOnInit(): void {
    
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.superAdminService.getSuperAdminById(this.id).subscribe((res)=>{
        if(res.code==200){
          let admin = res.admin;
          this.SuperAdminForm.controls["firstname"].setValue(admin.firstname);
          this.SuperAdminForm.controls["lastname"].setValue(admin.lastname);
          this.SuperAdminForm.controls["email"].setValue(admin.email);
          this.SuperAdminForm.controls["phone"].setValue(admin.phone);
          this.SuperAdminForm.controls["password"].setValue(admin.password);
          this.SuperAdminForm.controls["file"].setValue(admin.profile);
          this.image = "http://localhost:3000/images/"+admin.profile;
        }else{
          this.openSnackBar(res.message, "close");
        }
        
      } )
    }
  }

}
