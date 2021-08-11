import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCollectComponent } from './survey-collect.component';

describe('SurveyCollectComponent', () => {
  let component: SurveyCollectComponent;
  let fixture: ComponentFixture<SurveyCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
