import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeTableComponent } from './notice-table.component';

describe('NoticeTableComponent', () => {
  let component: NoticeTableComponent;
  let fixture: ComponentFixture<NoticeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
