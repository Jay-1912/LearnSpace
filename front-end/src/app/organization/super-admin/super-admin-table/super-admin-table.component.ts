import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs/internal/Subject';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-super-admin-table',
  templateUrl: './super-admin-table.component.html',
  styleUrls: ['./super-admin-table.component.css']
})
export class SuperAdminTableComponent {
  constructor(private _snackBar: MatSnackBar,public superAdminService:SuperAdminService,public dialog: MatDialog , private authService:AuthenticationService){}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  superAdmins$:any[] = [];
  displayTable: boolean = false;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

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
    this.superAdminService.deleteSuperAdmin(id).subscribe((res)=>{
      location.reload();
      this.openSnackBar(res.message, "close");
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
    this.superAdminService.getSuperAdmin().subscribe((res)=>{
      this.superAdmins$ = res.admins;
      this.displayTable = true;
    })
  }
}
