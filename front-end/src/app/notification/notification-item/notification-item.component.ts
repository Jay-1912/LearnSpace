import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { NotificationService } from 'src/app/services/notification.service';
import { INotification } from 'src/app/shared/interface';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {
  
  constructor(private notificationService:NotificationService, private courseService:CourseService){}

  @Input() notification!:string;

  title:string ="";
  time:string="";

  ngOnInit(): void{
    this.notificationService.getNotificationById(this.notification).subscribe((res)=>{
      if(res){
        if(res.type==="add_course"){
          this.courseService.getCourseByID(res.dataId).subscribe((course)=>{
            console.log(course[0]);
            this.title = "New course is added in your organization: '"+course[0].title+"'";
            this.time = res.date.substring(0,10);
          })
        }
      }
    })
  }

}
