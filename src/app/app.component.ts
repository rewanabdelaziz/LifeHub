import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HemoGivers';
  isLoading!: boolean;
  constructor(private loaderService: LoaderService) { }
  ngAfterViewInit(): void {
    // Simulate app initialization delay (replace with actual loading logic)
    setTimeout(() => {
      this.loaderService.hide();
    }, 2000); // Example delay of 2 seconds
  }
}
