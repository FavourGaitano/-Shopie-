import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OneUsercartResponse } from '../../interfaces/cartResponse.interface';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';
  cartArr: any = [];


  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {



  }

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.authService.readToken(
      (response) => {
        if (response && response.info && response.info.id) {

          this.cartService.getUserCart(response.info.id).subscribe({
            next: (OneUsercartResponse) => {
              console.log(OneUsercartResponse.cartDetails);

              this.cartArr = OneUsercartResponse.cartDetails || []
              if (OneUsercartResponse.cartDetails) {

                this.successMessage = 'Cart loaded successfully';



              } else if (OneUsercartResponse.error) {
                console.error('Error fetching cart:', OneUsercartResponse.error.message);
              } else {
                console.error('The cart data is not in the expected format:', OneUsercartResponse);
              }
            },
            error: (error) => console.error('Error fetching cart:', error)
          });
        } else {
          console.error('User ID is missing from the token response:', response);
        }
      },
      (error) => console.error('Error decoding token:', error)
    );
  }



}



