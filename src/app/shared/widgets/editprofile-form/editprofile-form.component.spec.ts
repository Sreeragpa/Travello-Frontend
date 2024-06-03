import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofileFormComponent } from './editprofile-form.component';

describe('EditprofileFormComponent', () => {
  let component: EditprofileFormComponent;
  let fixture: ComponentFixture<EditprofileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditprofileFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditprofileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
