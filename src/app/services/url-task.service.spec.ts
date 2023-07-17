import { TestBed } from '@angular/core/testing';

import { UrlTaskService } from './url-task.service';

describe('UrlTaskService', () => {
  let service: UrlTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
