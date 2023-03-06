import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-lecture-content',
  templateUrl: './lecture-content.component.html',
  styleUrls: ['./lecture-content.component.css']
})
export class LectureContentComponent implements OnChanges {
  @Input() src!:string;
  source!:string;
  ngOnChanges(){
    this.source = this.src; 
  }
}
