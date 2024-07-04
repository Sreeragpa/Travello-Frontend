import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminloginGuard } from './adminlogin.guard';

describe('adminloginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminloginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
