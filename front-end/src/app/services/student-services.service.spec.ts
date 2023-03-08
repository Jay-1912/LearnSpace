import { TestBed } from '@angular/core/testing';

import { StudentServicesService } from './student-services.service';

describe('StudentServicesService', () => {
  let service: StudentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
