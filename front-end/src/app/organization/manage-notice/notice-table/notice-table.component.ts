import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NoticeService } from 'src/app/services/notice.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-notice-table',
  templateUrl: './notice-table.component.html',
  styleUrls: ['./notice-table.component.css']
})
export class NoticeTableComponent {

  constructor(private _snackBar: MatSnackBar,public noticeService:NoticeService,public dialog: MatDialog ,private organizationService:OrganizationService, private authService:AuthenticationService){}


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  notices$:any[] = [];
  displayTable: boolean = false;
  loggedInUserId!:string;
  loggedInUserRole!:number;

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
    this.noticeService.deleteNotice(id).subscribe((res)=>{
        this.openSnackBar(res.message,"close");
        location.reload();  
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.noticeService.getNotices().subscribe((res)=>{
      res.notices = res.notices.filter((notice:any)=>{
        return notice.organization === this.loggedInUserId;
      })
      for(let notice of res.notices){
        this.organizationService.getOrganizationById(notice.organization).subscribe((res)=>{
          res = res[0];
          notice.organization = res.name;
        })
        notice.date = notice.date.substring(0,10);
      }
      this.notices$ = res.notices;
      this.displayTable = true;
    })
  }
}
