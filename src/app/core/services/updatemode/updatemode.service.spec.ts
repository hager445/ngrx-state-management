import { TestBed } from '@angular/core/testing';

import { UpdatemodeService } from './updatemode.service';

describe('UpdatemodeService', () => {
  let service: UpdatemodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatemodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
