import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categoryForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.categoryForm = this.fb.group({

      name: ['', [Validators.required]]


    })

  }

  ngOnInit(): void {}

  createCategory(): void {
    if (this.categoryForm.valid) {
      this.authService.createCategory(this.categoryForm.value).subscribe({
        next: (categoryResponse) => {
          console.log(categoryResponse);
          this.successMessage = 'Category created successfully!';
          this.errorMessage = '';

          this.categoryForm.reset();

        },
        error: (error) => {
          console.error("Category creation failed", error);
          this.errorMessage = 'Failed to create category. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      console.error("Category form is invalid");
      this.errorMessage = 'Please fill in all required fields.';
      this.successMessage = '';
    }
  }

}
