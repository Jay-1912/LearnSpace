import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-item',
  templateUrl: './notice-item.component.html',
  styleUrls: ['./notice-item.component.css']
})
export class NoticeItemComponent implements OnInit{
  @Input() notice!:object;

  title:string = "";
  date:string = "";

  ngOnInit(): void{
    if(this.notice){
      this.title = Object(this.notice)["title"];
      this.date = Object(this.notice)["date"];
    }
  }
}
