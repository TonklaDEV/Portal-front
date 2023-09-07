import { TestBed } from '@angular/core/testing';

import { FtrOf1Service } from './ftr-of1.service';

describe('FtrOf1Service', () => {
  let service: FtrOf1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtrOf1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
