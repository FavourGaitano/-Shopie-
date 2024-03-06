import { Component, OnInit} from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: boolean = false;

  public updateLoginState() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.checkLoginStatus();

    this.authService.triggerLoginStateCheck = () => {
      this.updateLoginState();
    };

    this.updateLoginState()

  }

  checkLoginStatus(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }



  logoutUser() {
    this.authService.logoutUser();
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

}
