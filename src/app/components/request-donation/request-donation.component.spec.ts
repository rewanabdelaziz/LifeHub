import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDonationComponent } from './request-donation.component';

describe('RequestDonationComponent', () => {
  let component: RequestDonationComponent;
  let fixture: ComponentFixture<RequestDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDonationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
