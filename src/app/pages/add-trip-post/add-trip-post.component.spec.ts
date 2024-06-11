import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripPostComponent } from './add-trip-post.component';

describe('AddTripPostComponent', () => {
  let component: AddTripPostComponent;
  let fixture: ComponentFixture<AddTripPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTripPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTripPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
