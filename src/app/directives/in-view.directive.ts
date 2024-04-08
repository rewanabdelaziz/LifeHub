import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective {

  @Output() inView: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top >= 0 && rect.bottom <= windowHeight;
    console.log("from the onwindow scroll");
    if (isVisible) {
      this.inView.emit();
    }
  }
}
