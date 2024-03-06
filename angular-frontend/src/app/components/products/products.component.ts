import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  ProductsForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  imgUrl: string | null = null

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,private categories: CategoriesService ) {
    this.ProductsForm = this.fb.group({

      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      descr: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]

    })

  }

  async uploadImage(event: any){

    const target = event.target
    const files = target.files
    if(files){
        console.log(files)
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "shopie")
        formData.append("cloud_name", "dr8ec6cww")


        // formData.forEach((dataItem)=>{
        //   console.log(dataItem);
        //   console.log(dataItem);
        //   this.imageUpload.push(dataItem)

          console.log(formData);



          await fetch('https://api.cloudinary.com/v1_1/dr8ec6cww/image/upload', {
            method: "POST",
            body: formData
          }).then(
            (res:any) => {

              return res.json()
            },

          ).then(data=>{
            console.log("this is the URL",data.url);
            this.ProductsForm.get('image')?.setValue(data.url)
            return data.url = this.imgUrl;

          }
          );



    }

  }

  ngOnInit(): void {


      this.fetchCategories();

  }




  createProduct(): void {
    if (this.ProductsForm.valid) {
      this.authService.createProduct(this.ProductsForm.value).subscribe({
        next: (ProductResponse) => {
          console.log(ProductResponse);
          this.successMessage = 'Product created successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error("Product creation failed", error);
          this.errorMessage = 'Failed to create product. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      console.error("Product form is invalid");
      this.errorMessage = 'Please fill in all required fields.';
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


