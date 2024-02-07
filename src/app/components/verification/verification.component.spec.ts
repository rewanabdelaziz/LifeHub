import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationComponent } from './verification.component';

describe('VerificationComponentComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationComponent]
    });
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
