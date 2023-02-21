import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { INotification } from '../shared/interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications!:INotification[];

  constructor(private notificationService:NotificationService){}

  ngOnInit(): void{
    this.notificationService.getNotifications().subscribe(
      ((notifications:INotification[]) =>{
        this.notifications = notifications;
        console.log(notifications);
      })
    )
  }

}
