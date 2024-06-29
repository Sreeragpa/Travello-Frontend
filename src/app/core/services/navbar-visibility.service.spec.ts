import { TestBed } from '@angular/core/testing';

import { NavbarVisibilityService } from './navbar-visibility.service';

describe('NavbarVisibilityService', () => {
  let service: NavbarVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
