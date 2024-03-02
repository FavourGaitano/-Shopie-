import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  loggedIn: boolean = false;

  constructor(private router: Router, private auth: AuthService) {

  }

  logoutAdmin() {
    localStorage.removeItem('authToken');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
