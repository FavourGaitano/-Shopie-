import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../interfaces/user.interfaces';


@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {

  usersArr: any[] = [];
  created_at = new Date()
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private api: ApiService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.api.getUsers().subscribe((res) => {
      if (res.error) {
        console.log(res.error);
      } else if (res.users) {
        console.log(res.users);
        this.usersArr = res.users;

        this.usersArr = res.users
      }
    });
  }

  deleteUser(id: string) {

    console.log('deleteUser function called with id:', id);


    this.api.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.successMessage = 'User deleted successfully.';
        this.errorMessage = '';
        this.fetchUsers();
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to delete the user. Please try again.';
        this.successMessage = '';
      }

    });


  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    console.log('Clicked element:', event.target);
  }



}
