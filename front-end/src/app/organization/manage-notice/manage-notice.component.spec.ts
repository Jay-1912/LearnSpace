import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNoticeComponent } from './manage-notice.component';

describe('ManageNoticeComponent', () => {
  let component: ManageNoticeComponent;
  let fixture: ComponentFixture<ManageNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
