import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OneUsercartResponse } from '../../interfaces/cartResponse.interface';
import { deleteItemCart } from '../../interfaces/cart.interface';
import { Order } from '../../interfaces/order.interface';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';
  cartArr: any = [];
  cart_id!: string ;
  user_id!:string;
  totalPrice: number = 0;



  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {



  }

  ngOnInit() {
    this.fetchCart();

  }

  tempUserId!: string;

  fetchCart() {
    this.authService.readToken(
      (response) => {
        if (response && response.info && response.info.id) {
          this.tempUserId = response.info.id;
          this.cartService.getUserCart(response.info.id).subscribe({
            next: (OneUsercartResponse) => {
              console.log("kjuhytxsdxrtbn",OneUsercartResponse);

              this.cartArr = OneUsercartResponse.cartDetails || []
              this.cart_id = this.cartArr[0].cart_id;
              this.user_id=this.cartArr[0].user_id;

              if (OneUsercartResponse.cartDetails) {

                // this.successMessage = 'Cart loaded successfully';



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

  deleteItemCart(id: string, product_id:string) {
    console.log('delete Item function called with id:', id);


    const details: deleteItemCart = {
      cart_id:id,
      product_id
    };

    this.cartService.deleteItemCart(id, details).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchCart();
        this.successMessage = 'Product removed successfully.';
        this.errorMessage = '';

      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to remove the product. Please try again.';
        this.successMessage = '';
      }
    });
  }

  checkoutCart(id: string) {

    console.log('checkout function called with id:', id);


    this.cartService. checkoutCart(id, this.tempUserId).subscribe({

      next: (res) => {
        console.log(this.tempUserId);
        console.log(res);
        if(res.message){
          this.fetchCart();
          this.successMessage = res.message;

        }
        else{
          this.errorMessage = 'Trouble checking out the cart. Please try again.';
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to check out the cart. Please try again.';
        this.successMessage = '';
      }

    });




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


        this.successMessage = 'Failed to create order. ' + (error.error?.message || error.message);
        console.error('Failed to create order:', error);

      }
    });
  }





  // checkoutCart(id: string) {
  //   console.log('Checkout function called with id:', id);

  //   this.cartService.checkoutCart(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.message) {
  //         this.fetchCart();
  //         this.successMessage = res.message;
  //         // Directly call createOrderFromCart with cart_id
  //         this.createOrderFromCart(id);
  //       } else {
  //         this.errorMessage = 'Trouble checking out the cart. Please try again.';
  //       }
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       this.errorMessage = 'Failed to check out the cart. Please try again.';
  //       this.successMessage = '';
  //     }
  //   });
  // }


}
