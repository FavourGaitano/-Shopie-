import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent {

  successMessage: string = '';
  errorMessage: string = '';

  categoriesArr: any[]=[];

  constructor(private categories: CategoriesService) {
    this.fetchCategories();
  }

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

  deleteCategory(id: string) {
    this.categories.deleteCategory(id).subscribe({
      next: (res) => {
      console.log(res);
      this.successMessage = 'Category deleted successfully.';
      this.errorMessage = '';
      this.fetchCategories();
    },
    error: (error) => {
      console.error(error);
      this.errorMessage = 'Failed to delete the category. Please try again.';
      this.successMessage = '';
    }
    });
  }


}
