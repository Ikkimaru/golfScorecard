import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScorecardComponent } from './edit-scorecard.component';

describe('EditScorecardComponent', () => {
  let component: EditScorecardComponent;
  let fixture: ComponentFixture<EditScorecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditScorecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScorecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
