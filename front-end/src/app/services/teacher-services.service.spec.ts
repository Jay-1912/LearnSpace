import { TestBed } from '@angular/core/testing';

import { TeacherServicesService } from './teacher-services.service';

describe('TeacherServicesService', () => {
  let service: TeacherServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
