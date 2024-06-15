import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripGridComponent } from './trip-grid.component';

describe('TripGridComponent', () => {
  let component: TripGridComponent;
  let fixture: ComponentFixture<TripGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
