import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrganizationService } from 'src/app/services/organization.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

@Component({
  selector: 'app-organization-table',
  templateUrl: './organization-table.component.html',
  styleUrls: ['./organization-table.component.css']
})
export class OrganizationTableComponent implements OnInit {
  constructor(public dialog: MatDialog ,private organizationService:OrganizationService, private authService:AuthenticationService){}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  organizations$:any[] = [];
  displayTable: boolean = false;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id:string): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{isDelete:false}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result==true){
          this.handleDeleteOrg(id);
        }
    });
  }
  
  handleDeleteOrg(id:string){
    this.organizationService.deleteOrganization(id).subscribe( (res)=>{
      console.log(res);
      location.reload();
    })
  }
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      window.location.href = "http://localhost:4200";
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.organizationService.getOrganization().subscribe( (res)=>{
      this.organizations$ = res;
      this.displayTable = true;
    })
  }
}
