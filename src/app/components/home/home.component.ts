import { Component, HostListener, OnInit, ElementRef, OnDestroy, ChangeDetectorRef, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { HomeDataService } from 'src/app/services/home-data.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { InViewDirective } from 'src/app/directives/in-view.directive';
import { LanguageService } from 'src/app/services/language.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('heartbeatAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),

    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),

    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  isVisible = false;
  donateAnimationTriggered = false;

  @ViewChild('donateSection') donateSection!: ElementRef;

  animate = false;
  @ViewChild('homeComponent') homeComponent!: ElementRef;







  paragraph1Animation = false;
  paragraph2Animation = false;
  paragraph3Animation = false;
  paragraph4Animation = false;
  headingAnimation = false;






  showParagraph = false;

  bloodBankValue: number = 0;
  loginSuccess;
  totalRecipients: number = 0;
  totalDonors: number = 0;
  totalRegisters: number = 0;
  value = sessionStorage.getItem("Log In") !== null;

  currentRecipients: number = 0;
  currentDonors: number = 0;
  currentRegisters: number = 0;
  currentBanks: number = 0;
  currentLanguage: string = "";
  private destroy$: Subject<void> = new Subject<void>();
  private scrollSubject: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private dataService: HomeDataService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService
  ) {
    this.loginSuccess = this.authService.isLoggedIn$;
  }





  ngAfterViewInit() {
    this.calculateTriggerHeight();
    // Listen for scroll events
    window.addEventListener('scroll', this.onScroll.bind(this), true);




    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5 // Trigger when half of the element is visible
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.donateAnimationTriggered) {
          this.donateAnimationTriggered = true;
        }
      });
    }, options);

    observer.observe(this.donateSection.nativeElement);






    }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const donateElement = this.el.nativeElement.querySelector('.donate');

    if (!donateElement) {
      return;
    }

    const homeElement = this.el.nativeElement.querySelector('.home');
    const overviewElement = this.el.nativeElement.querySelector('.overview');

    if (!homeElement || !overviewElement) {
      return;
    }

    const homeOffsetTop = homeElement.offsetTop;
    const overviewOffsetTop = overviewElement.offsetTop;
    const donateOffsetTop = donateElement.offsetTop;
    const windowHeight = window.innerHeight;

    // Calculate the trigger point
    const triggerOffset = homeOffsetTop + overviewOffsetTop;

    // Check if scroll position is past the trigger point
    if (window.scrollY > triggerOffset && !this.donateAnimationTriggered) {
      this.donateAnimationTriggered = true;
    }
  }

  calculateTriggerHeight() {
    const height = this.homeComponent.nativeElement.offsetHeight;
    // Use height as the trigger point for animations
    const triggerHeight = height; // Use the height of the home component
    console.log('Height of home component:', triggerHeight);

    // Adjust animations based on triggerHeight if needed
  }

  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Trigger animations when scroll reaches the calculated trigger height
    if (scrollPosition >= this.homeComponent.nativeElement.offsetTop && !this.paragraph1Animation) {
      this.paragraph1Animation = true;
    }
    if (scrollPosition >= this.homeComponent.nativeElement.offsetTop && !this.paragraph2Animation) {
      this.paragraph2Animation = true;
    }
    if (scrollPosition >= this.homeComponent.nativeElement.offsetTop && !this.paragraph3Animation) {
      this.paragraph3Animation = true;
    }
    if (scrollPosition >= this.homeComponent.nativeElement.offsetTop && !this.headingAnimation) {
      this.headingAnimation = true;
    }
  }













  ngOnInit(): void {




    setTimeout(() => {
      this.isVisible = true;
    }, 2500); // تأخير لبدء الحركة بعد 1 ثانية (1000 مللي ثانية)








    // Subscribe to language changes if needed language
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage=language;
      console.log('Current language:', this.currentLanguage);
    });



    // numbers count
    this.scrollSubject.pipe(
      debounceTime(200), // Adjust debounce time as needed
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.checkInView();
    });
    // console.log(this.value)
    this.fetchData();
    this.countBloodBank();
  }


  // language
  applyArabicClass(): boolean {
    return this.currentLanguage === 'ar';
  }

  // numbers
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchData(): void {
    this.dataService.getTotalRecipients().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalRecipients = response.total_Recipints;
        if(this.totalRecipients==0){
          this.totalRecipients=43
        }
        // console.log("from fetch re method ", this.totalRecipients);
        this.checkInView();
        this.animateCount('recipients'); // Call animateCount here
    });

    this.dataService.getTotalDonars().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalDonors = response.total_Donners;
        if(this.totalDonors==0){
          this.totalDonors=54
        }
        // console.log("from fetch donor method", this.totalDonors);
        this.checkInView();
        this.animateCount('donors'); // Call animateCount here
    });

    this.dataService.getTotalRegeisters().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalRegisters = response.totalRegisters;
        if(this.totalRegisters==0){
          this.totalRegisters=43
        }
        // console.log("from fetch reg method", this.totalRegisters);
        this.checkInView();
        this.animateCount('registers'); // Call animateCount here
    });
}

  private animationTriggered: boolean = false;

  @HostListener("window:scroll", ["$event"])
  checkInView(): void {
      // console.log("checkInView() triggered"); // Add debug log
      if (!this.animationTriggered) {
          const rect = this.el.nativeElement.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top >= 0 && rect.bottom <= windowHeight) {
              this.startCountAnimation();
              this.animationTriggered = true; // Set the flag to true to indicate that animation has been triggered
          }
      }
  }

  startCountAnimation(): void {
    // console.log("from startCountAnimation");
    this.animateCount('recipients');
    this.animateCount('donors');
    this.animateCount('registers');
    this.countBloodBank();
    // this.animateBloodBank() // Call animateBloodBank here
    // console.log("after animateBloodBank()")
  }
  countBloodBank(): void {
    let currentValue = 0;

    const interval = setInterval(() => {
        if (currentValue < 21) {
            currentValue++;
            this.bloodBankValue = currentValue;
            this.updateCurrentCount('banks', currentValue);
            this.cdr.detectChanges();
        } else {
            clearInterval(interval);
        }
    }, 150);
  }

  animateCount(type: 'recipients' | 'donors' | 'registers'): void {
    const finalCount = type === 'recipients' ? this.totalRecipients :
        type === 'donors' ? this.totalDonors :
        this.totalRegisters;

    // console.log(type, finalCount);

    let currentValue = 0;
    const interval = setInterval(() => {
        if (currentValue < finalCount) {
            currentValue++;
            this.updateCurrentCount(type, currentValue);
        } else {
            clearInterval(interval);
        }
    }, 70);
}

// animateBloodBank(): void {
//   // console.log("animateBloodBank() called"); // Add debug log
//   const finalCount = this.bloodBankValue; // Use bloodBankValue as final count
//   // console.log('bloodBank', finalCount); // Add debug log

//   let currentValue = 0;
//   const interval = setInterval(() => {
//       if (currentValue < finalCount) {
//           currentValue++;
//           this.bloodBankValue = currentValue; // Update bloodBankValue
//       } else {
//           clearInterval(interval);
//       }
//   }, 70);
// }


  updateCurrentCount(type: 'recipients' | 'donors' | 'registers' |'banks', value: number): void {
    switch (type) {
      case 'recipients':
        this.currentRecipients = value;
        break;
      case 'donors':
        this.currentDonors = value;
        break;
      case 'registers':
        this.currentRegisters = value;
        break;
      case 'banks':
      this.currentBanks = value;
      break;
    }
  }

  onInView(type: 'recipients' | 'donors' | 'registers'): void {
    // console.log(`${type} is in view`);
  }


}
