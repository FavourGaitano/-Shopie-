import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { OneproductResponse } from '../../interfaces/productsResponse.interfaces';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/products.interfaces'
import { ProductsComponent } from '../products/products.component';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-one-product',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductsComponent],
  templateUrl: './view-one-product.component.html',
  styleUrls: ['./view-one-product.component.css']
})
export class ViewOneProductComponent implements OnInit, OnDestroy {
  product: Product | null = null;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router:Router, private auth:AuthService, private api:ApiService) {}




  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['product_id'];
      if (productId) {
        this.fetchProduct(productId);
      } else {
        this.errorMessage = 'Product ID not found in route parameters.';
      }
    });
  }

  fetchProduct(id: string) {
    this.productsService.getOneProductDetails(id).subscribe({
      next: (res) => {
        this.product = res.product[0];
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch product details.';
        console.error(err);
      }
    });
  }


  ngOnDestroy() {
    localStorage.removeItem('selectedProductId');
  }

  createCartNow(productId: string) {
    if (!productId) {
      this.errorMessage = 'Product ID is undefined. Cannot proceed with creating cart.';
      return;
    }
    console.log('Product ID:', productId);
    this.auth.readToken(
      (tokenResponse) => {
        const userId = tokenResponse.info.id;
        if (!userId) {
          this.errorMessage = 'User ID is missing or not retrieved correctly. Cannot proceed with adding product to cart.';
          return;
        }

        const cartDetails = {
          user_id: userId,
          product_id: productId,
          quantity: 1
        };

        console.log('cart details:', cartDetails);

        this.auth.createCart(cartDetails).subscribe({
          next: (response) => {
            this.successMessage = response.message;
            console.log('Cart created successfully:', response);


          },
          error: (error) => {
            this.errorMessage = 'Error creating cart.';
            console.error('Error creating cart', error);
            // Error creating booking. Please try again.

          }
        });
      },
      (error) => {
        this.errorMessage = 'Error fetching user details. Cannot proceed with creating cart.';
        console.error("Error fetching user details with token", error);
      }
    );
  }
}
