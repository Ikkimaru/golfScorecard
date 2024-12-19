import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfCourseManagementComponent } from './golf-course-management.component';

describe('GolfCourseManagementComponent', () => {
  let component: GolfCourseManagementComponent;
  let fixture: ComponentFixture<GolfCourseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GolfCourseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GolfCourseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
