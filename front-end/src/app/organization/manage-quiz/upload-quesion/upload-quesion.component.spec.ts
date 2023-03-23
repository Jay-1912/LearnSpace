import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQuesionComponent } from './upload-quesion.component';

describe('UploadQuesionComponent', () => {
  let component: UploadQuesionComponent;
  let fixture: ComponentFixture<UploadQuesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadQuesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadQuesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
