import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/User.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;

  constructor(private alertify: AlertifyService,private authService: AuthService, private userSrevice: UserService) { }

  ngOnInit() {
  }

  sendLike( id: number)
  {
    this.userSrevice.sendLike(this.authService.decodeToken.nameid, id).subscribe(data => {
      this.alertify.success('you have liked ' + this.user.username);
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {this.alertify.error(error);
    });
  }

}
