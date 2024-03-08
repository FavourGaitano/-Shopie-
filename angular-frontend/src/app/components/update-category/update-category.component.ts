import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  successMessage: string = '';
  errorMessage: string = '';

  updateCategoryForm!:FormGroup
  id!: string
  category!:Category

  constructor(private fb: FormBuilder, private route:ActivatedRoute, private categories: CategoriesService){

    this.getCategoryId()

    this.updateCategoryForm = this.fb.group({
      name: ['', [Validators.required]]

    })
  }

  ngOnInit(): void {}

  getCategoryId(){
    this.route.params.subscribe(res=>{
      console.log(res['category_id']);
      this.id = res['category_id']

      this.getCategoryDetails()
    })
  }

  getCategoryDetails(){
    this.categories.getOneCategoryDetails(this.id).subscribe(res=>{
      console.log(res);
      this.category = res.category[0]

      this.updateCategoryForm.get('name')?.setValue(this.category.name)


    })
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      this.categories.updateCategoryDetails(this.id, this.updateCategoryForm.value).subscribe({
        next: (res) => {

          this.successMessage = "Category updated successfully!";
          this.errorMessage = '';

          this.updateCategoryForm.reset();

        },
        error: (error) => {

          this.errorMessage = "An error occurred while updating the category. Please try again.";
          this.successMessage = '';
        }
      });
    } else {

      this.errorMessage = "Please ensure all fields are filled out correctly.";
      this.successMessage = '';
    }
  }

}
