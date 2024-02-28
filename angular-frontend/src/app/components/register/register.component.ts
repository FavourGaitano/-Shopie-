import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, FooterComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  
})
export class RegisterComponent {
  registerForm!: FormGroup;
  successMessage: string = '';
  showSuccessMessage: boolean = false;
  onRegisterSubmit(){}
}
