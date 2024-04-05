import { ElementRef } from '@angular/core';
import { InViewDirective } from './in-view.directive';

describe('InViewDirective', () => {
  it('should create an instance', () => {
    // Create a mock ElementRef instance
    const elementRefMock: ElementRef = {
      nativeElement: document.createElement('div')
    };

    // Instantiate the directive with the mock ElementRef
    const directive = new InViewDirective(elementRefMock);

    // Assert that the directive instance is truthy
    expect(directive).toBeTruthy();
  });
});
