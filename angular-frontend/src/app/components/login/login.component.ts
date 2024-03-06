import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, LoginComponent, FooterComponent, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessMessage: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit(): void {}


  onSubmit(){

    if (this.loginForm.valid) {
      this.auth.loginUser(this.loginForm.value).subscribe({
        next: (loginResponse) => {

          if (loginResponse.token) {
            localStorage.setItem('authToken', loginResponse.token);
            this.auth.readToken(
              (tokenResponse) => {

                if (tokenResponse.info.role === 'admin') {
                  this.successMessage = 'Login successful. Redirecting to admin...';
                  setTimeout(() => this.router.navigate(['admin']), 2000);
                } else if (tokenResponse.info.role === 'user') {
                  this.successMessage = 'Login successful.';
                  setTimeout(() => this.router.navigate(['user']), 2000);

                }
                this.auth.triggerLoginStateCheck();
              },
              (error) => {
                console.error("Error fetching user details with token", error);
                this.errorMessage = 'Error fetching user details. Please try again.';
              }
            );
          }
        },
        error: (error) => {
          console.error("Login failed", error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      });
    } else {
      console.error("Form is invalid");
    }

  }
}
