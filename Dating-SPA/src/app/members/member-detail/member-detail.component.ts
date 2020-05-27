import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/User.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private alertify: AlertifyService, private userService: UserService, private rout: ActivatedRoute) { 

  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.userService.getUser(+this.rout.snapshot.params['id']).subscribe((user: User) => {
      this.user = user;
    }, error =>{
    this.alertify.error(error);
    });
  }
}
