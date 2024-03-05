import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';import { RouterLink } from '@angular/router';
import { ViewOneProductComponent } from '../view-one-product/view-one-product.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, ViewOneProductComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  timeRemaining: any;
  productsArr: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 12;
  paginatedProducts: any[] = []

  successMessage: string = '';
  errorMessage: string = '';


  constructor(private products: ProductsService) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.products.getProducts().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.products) {
        console.log(res.products);
        this.productsArr = res.products;
        this.updatePaginatedProducts();

        this.productsArr = res.products
      }
    });
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.productsArr.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  maxPage(): number {
    return Math.ceil(this.productsArr.length / this.itemsPerPage);
  }

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
