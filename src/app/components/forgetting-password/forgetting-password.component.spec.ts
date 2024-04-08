import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgettingPasswordComponent } from './forgetting-password.component';

describe('ForgettingPasswordComponent', () => {
  let component: ForgettingPasswordComponent;
  let fixture: ComponentFixture<ForgettingPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgettingPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgettingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
