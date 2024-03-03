import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [ RouterLink, CommonModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {

  productsArr: any[] = [];
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

        this.productsArr = res.products
      }
    });
  }

  deleteProduct(id: string) {

    console.log('deleteProduct function called with id:', id);


    this.products.deleteProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'Product deleted successfully.';
        this.errorMessage = '';
        this.fetchProducts();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to delete the product. Please try again.';
        this.successMessage = '';
      }

    });


  }



}
