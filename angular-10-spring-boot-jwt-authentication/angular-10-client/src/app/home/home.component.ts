import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  users: User[] | undefined;
  id: number;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getUsers();
    //this.getUserById();
  }

  private getUsers() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  redirectToUserList() {
    this.router.navigate(['/users']);
  }
  onSubmit() {
    //this.id = this.router.snapshot.params['id'];
    this.updateUser(this.id);
  }

  private getUserById() {
   // this.id = this.router.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe({
      next: (data) => {
       // this.user = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUsers();
    });
  }

  registerUser() {
    this.router.navigate(['register-user']);
  }
}
