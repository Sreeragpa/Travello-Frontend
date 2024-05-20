import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytoastComponent } from './mytoast.component';

describe('MytoastComponent', () => {
  let component: MytoastComponent;
  let fixture: ComponentFixture<MytoastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MytoastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MytoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
