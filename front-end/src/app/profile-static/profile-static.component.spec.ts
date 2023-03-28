import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStaticComponent } from './profile-static.component';

describe('ProfileStaticComponent', () => {
  let component: ProfileStaticComponent;
  let fixture: ComponentFixture<ProfileStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileStaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
