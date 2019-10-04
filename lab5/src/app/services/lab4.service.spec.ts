import { TestBed } from '@angular/core/testing';

import { Lab4Service } from './lab4.service';

describe('Lab4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Lab4Service = TestBed.get(Lab4Service);
    expect(service).toBeTruthy();
  });
});
