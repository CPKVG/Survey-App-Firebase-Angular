import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyUrlComponent } from './survey-url.component';

describe('SurveyUrlComponent', () => {
  let component: SurveyUrlComponent;
  let fixture: ComponentFixture<SurveyUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
