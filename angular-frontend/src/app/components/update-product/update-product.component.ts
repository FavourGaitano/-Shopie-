import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/products.interfaces';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  successMessage: string = '';
  errorMessage: string = '';

  updateProductForm!:FormGroup
  id!: string
  product!:Product


  imageUpload:any[] = []
  imgUrl!: any

  constructor(private fb: FormBuilder, private route:ActivatedRoute, private productsService: ProductsService, private categories: CategoriesService){

    this.getProductId()

    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {


  this.fetchCategories();

}

uploadImage(event: any): void{}

  getProductId(){
    this.route.params.subscribe(res=>{
      console.log(res['product_id']);
      this.id = res['product_id']

      this.getProductDetails()
    })
  }

  getProductDetails(){
    this.productsService.getOneProductDetails(this.id).subscribe(res=>{
      console.log(res);
      this.product = res.product[0]

      this.updateProductForm.get('name')?.setValue(this.product.name)
      this.updateProductForm.get('image')?.setValue(this.product.image)
      this.updateProductForm.get('descr')?.setValue(this.product.descr)
      this.updateProductForm.get('quantity')?.setValue(this.product.quantity)
      this.updateProductForm.get('price')?.setValue(this.product.price)
      this.updateProductForm.get('category_id')?.setValue(this.product.category_id)

    })
  }

  updateProduct() {
    if (this.updateProductForm.valid) {
      this.productsService.updateProductDetails(this.id, this.updateProductForm.value).subscribe({
        next: (res) => {

          this.successMessage = "Product updated successfully!";
          this.errorMessage = '';

          this.updateProductForm.reset();


        },
        error: (error) => {

          this.errorMessage = "An error occurred while updating the product. Please try again.";
          this.successMessage = '';
        }
      });
    } else {

      this.errorMessage = "Please ensure all fields are filled out correctly.";
      this.successMessage = '';
    }
  }

  categoriesArr: any[]=[];

  fetchCategories(){

    this.categories.getCategories().subscribe(res=>{

      if (res.error) {
        console.log(res.error);
      } else if (res.categories) {
        console.log(res.categories);
        this.categoriesArr = res.categories;
      }
    })

    console.log (this.categories)
  }




}
