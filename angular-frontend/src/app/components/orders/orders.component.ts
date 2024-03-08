import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';
  orderArr: any = [];



  constructor(
    private ordersservice: OrdersService,
    private authService: AuthService,
    private router: Router
  ) {



  }

  ngOnInit() {
    this.fetchOrder();

  }



  fetchOrder() {
    this.authService.readToken(
      (response) => {
        if (response && response.info && response.info.id) {
          this.ordersservice.getUserOrder(response.info.id).subscribe({
            next: (OneUserorderResponse) => {
              console.log(OneUserorderResponse.orderDetails);
              if (OneUserorderResponse.orderDetails.length > 0) {
                this.orderArr = OneUserorderResponse.orderDetails;

              } else if (OneUserorderResponse.error) {
                console.error('Error fetching orders:', OneUserorderResponse.error.message);
              } else {
                console.error('The order data is not in the expected format:', OneUserorderResponse);
              }
            },
            error: (error) => console.error('Error fetching orders:', error)
          });
        } else {
          console.error('User ID is missing from the token response:', response);
        }
      },
      (error) => console.error('Error decoding token:', error)
    );
  }




}
