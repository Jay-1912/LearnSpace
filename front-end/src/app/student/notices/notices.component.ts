import { Component, OnChanges, OnInit } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';
import { INotice } from 'src/app/shared/interface';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit, OnChanges {
  notices!:INotice[];
  constructor(private noticeServise:NoticeService){}

  ngOnInit(): void {
    this.noticeServise.getNotices().subscribe(
      ((notices: INotice[]) =>{
        this.notices = notices;
      })
    );
    
  }

  ngOnChanges(){
  }
}
