import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeFormComponent } from './notice-form.component';

describe('NoticeFormComponent', () => {
  let component: NoticeFormComponent;
  let fixture: ComponentFixture<NoticeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
