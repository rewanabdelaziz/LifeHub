import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationComponentComponent } from './verification-component.component';

describe('VerificationComponentComponent', () => {
  let component: VerificationComponentComponent;
  let fixture: ComponentFixture<VerificationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationComponentComponent]
    });
    fixture = TestBed.createComponent(VerificationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
