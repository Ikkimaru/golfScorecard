import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScorecardsComponent } from './view-scorecards.component';

describe('ViewScorecardsComponent', () => {
  let component: ViewScorecardsComponent;
  let fixture: ComponentFixture<ViewScorecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewScorecardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScorecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
