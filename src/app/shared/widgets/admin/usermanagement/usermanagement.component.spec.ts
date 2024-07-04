import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementComponent } from './usermanagement.component';

describe('UsermanagementComponent', () => {
  let component: UsermanagementComponent;
  let fixture: ComponentFixture<UsermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
