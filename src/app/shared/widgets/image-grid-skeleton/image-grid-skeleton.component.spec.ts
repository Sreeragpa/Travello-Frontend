import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGridSkeletonComponent } from './image-grid-skeleton.component';

describe('ImageGridSkeletonComponent', () => {
  let component: ImageGridSkeletonComponent;
  let fixture: ComponentFixture<ImageGridSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGridSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageGridSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
