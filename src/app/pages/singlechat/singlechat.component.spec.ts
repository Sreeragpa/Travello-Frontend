import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglechatComponent } from './singlechat.component';

describe('SinglechatComponent', () => {
  let component: SinglechatComponent;
  let fixture: ComponentFixture<SinglechatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglechatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
