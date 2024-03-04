import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-view-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-view-products.component.html',
  styleUrl: './user-view-products.component.css'
})
export class UserViewProductsComponent {

}
