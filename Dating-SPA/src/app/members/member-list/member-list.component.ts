import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/User.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/models/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination1: Pagination;

  constructor(private userService: UserService, 
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      // tslint:disable-next-line: no-string-literal
      this.users = data['users'].result;
      this.pagination1 = data['users'].pagination;

    });
  }

  pageChanged(event: any): void {
    this.pagination1.currentPage = event.page;
    this.loadUsers();
    }


  loadUsers() {
    this.userService
    .getUsers(this.pagination1.currentPage, this.pagination1.itemsPerPage)
    .subscribe(
      (res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination1 = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}