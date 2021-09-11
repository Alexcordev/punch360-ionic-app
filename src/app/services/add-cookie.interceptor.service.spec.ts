import { TestBed } from '@angular/core/testing';

import { AddCookie.InterceptorService } from './add-cookie.interceptor.service';

describe('AddCookie.InterceptorService', () => {
  let service: AddCookie.InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCookie.InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
