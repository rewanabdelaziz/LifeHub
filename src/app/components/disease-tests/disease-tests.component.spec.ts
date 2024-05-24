import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTestsComponent } from './disease-tests.component';

describe('DiseaseTestsComponent', () => {
  let component: DiseaseTestsComponent;
  let fixture: ComponentFixture<DiseaseTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseaseTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
