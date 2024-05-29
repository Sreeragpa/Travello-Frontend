import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemSkeletonComponent } from './post-item-skeleton.component';

describe('PostItemSkeletonComponent', () => {
  let component: PostItemSkeletonComponent;
  let fixture: ComponentFixture<PostItemSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostItemSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
