import { Component, Input, OnInit } from '@angular/core';
import { INotification } from 'src/app/shared/interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification!:Object;

  title:string ="";
  time:string="";

  ngOnInit(): void{
    if(this.notification){
      this.title = Object(this.notification)["title"];
      this.time = Object(this.notification)["time"];
    }
  }

}
