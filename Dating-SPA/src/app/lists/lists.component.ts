import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Pagination, PaginatedResult } from '../models/Pagination';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
users: User[];
pagination: Pagination;
likesParam: string;

  constructor(private userService: UserService, private alertify: AlertifyService,
              private router: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data['user'].result;
      this.pagination = data['user'].pagination;
      });
    this.likesParam = 'Likers';
    }

    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadUsers();
      }

    loadUsers() {
      this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    }
}
