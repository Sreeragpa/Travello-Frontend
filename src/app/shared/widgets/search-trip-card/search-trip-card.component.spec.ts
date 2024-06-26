import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTripCardComponent } from './search-trip-card.component';

describe('SearchTripCardComponent', () => {
  let component: SearchTripCardComponent;
  let fixture: ComponentFixture<SearchTripCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTripCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
