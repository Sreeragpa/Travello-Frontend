import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripItemSkeletonComponent } from './trip-item-skeleton.component';

describe('TripItemSkeletonComponent', () => {
  let component: TripItemSkeletonComponent;
  let fixture: ComponentFixture<TripItemSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripItemSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
