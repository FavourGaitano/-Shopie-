import { Component, OnInit} from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../interfaces/order.interface';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  cart_id!: string ;
  user_id!: string ;

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

  createOrderFromCart(cart_id: string, user_id: string) {
    const orderDetails: Order = {
      user_id: user_id,
      cart_id: cart_id
    };

    this.authService.createOrder(orderDetails).subscribe({
      next: (response) => {

        this.errorMessage = '';
        this.successMessage = 'Order created: ' + response.message;
        console.log('Order created:', response.message);

        this.router.navigate(['/orders']).then(() => {
          console.log('Navigated to orders page');
        });

      },
      error: (error) => {

        this.successMessage = '';
        this.errorMessage = 'Failed to create order. ' + (error.error?.message || error.message);
        console.error('Failed to create order:', error);

      }
    });
  }

}
