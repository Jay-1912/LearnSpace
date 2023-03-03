import { Component } from '@angular/core';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent {
  displayedColumns: string[] = ['position', 'firstname', 'lastname', 'id'];

  // TODO: create student interface for type safety implement to dataSource

  // TODO: dataSource should be api call for whole student list

  dataSource: any = [
    { position: 1, firstname: 'harsh', lastname: 'majithiya', id: '19it453' },
    { position: 1, firstname: 'harsh', lastname: 'majithiya', id: '19it453' },
    { position: 1, firstname: 'harsh', lastname: 'majithiya', id: '19it453' },
    { position: 1, firstname: 'harsh', lastname: 'majithiya', id: '19it453' },
    { position: 1, firstname: 'harsh', lastname: 'majithiya', id: '19it453' },
  ];
}
