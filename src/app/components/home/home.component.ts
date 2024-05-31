import { Component, HostListener, OnInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { HomeDataService } from 'src/app/services/home-data.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { InViewDirective } from 'src/app/directives/in-view.directive';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  bloodBankValue: number = 0;
  loginSuccess;
  totalRecipients: number = 0;
  totalDonors: number = 0;
  totalRegisters: number = 0;
  value = sessionStorage.getItem("Log In") !== null;

  currentRecipients: number = 0;
  currentDonors: number = 0;
  currentRegisters: number = 0;
  currentBanks:number=0;

  private destroy$: Subject<void> = new Subject<void>();
  private scrollSubject: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private dataService: HomeDataService,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    this.loginSuccess = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchData(): void {
    this.dataService.getTotalRecipients().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalRecipients = response.total_Recipints;
        // console.log("from fetch re method ", this.totalRecipients);
        this.checkInView();
        this.animateCount('recipients'); // Call animateCount here
    });

    this.dataService.getTotalDonars().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalDonors = response.total_Donners;
        // console.log("from fetch donor method", this.totalDonors);
        this.checkInView();
        this.animateCount('donors'); // Call animateCount here
    });

    this.dataService.getTotalRegeisters().pipe(
        takeUntil(this.destroy$)
    ).subscribe(response => {
        this.totalRegisters = response.totalRegisters;
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
        if (currentValue < 5) {
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
