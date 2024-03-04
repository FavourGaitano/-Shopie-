import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  timeRemaining: any;

  constructor() { }

  ngOnInit(): void {
    this.calculateTimeRemaining();
    setInterval(() => {
      this.calculateTimeRemaining();
    }, 1000);
  }

  calculateTimeRemaining(): void {
    const endTime = new Date('2024-03-09T00:00:00Z'); // Set your offer end time
    const currentTime = new Date();
    const timeDifference = endTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    } else {
      this.timeRemaining = {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
      };
    }
  }
}
