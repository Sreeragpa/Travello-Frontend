import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProfileCardComponent } from './search-profile-card.component';

describe('SearchProfileCardComponent', () => {
  let component: SearchProfileCardComponent;
  let fixture: ComponentFixture<SearchProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProfileCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
