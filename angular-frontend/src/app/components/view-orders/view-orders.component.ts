import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {

  ordersArr: any[] = [];
  created_at = new Date()
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private orderservice: OrdersService) {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderservice.getOrders().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.orders) {
        console.log(res.orders);
        this.ordersArr = res.orders;

        this.ordersArr = res.orders
      }
    });
  }

  changeStatus(id: string) {

    console.log('change status function called with id:', id);


    this.orderservice. changeStatus(id).subscribe({
      next: (res) => {
        this.fetchOrders();
        console.log(res);
        if(res.message){

          this.successMessage = res.message;
        }
        else{
          this.errorMessage = 'Trouble changing the status. Please try again.';
        }
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to change the status. Please try again.';
        this.successMessage = '';
      }

    });


  }

}
