import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { UserService } from 'src/app/_services/User.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edite',
  templateUrl: './member-edite.component.html',
  styleUrls: ['./member-edite.component.css']
})
export class MemberEditeComponent implements OnInit {
  user: User;
 @ViewChild('editForm', {static: true}) editForm: NgForm;
 @HostListener ('window:beforeunload',['$event'])
 unloadNotification($event: any){
   if (this.editForm.dirty){
     $event.returnValue = true;
   }
 }


constructor(private route: ActivatedRoute, private userService: UserService, private alert: AlertifyService, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.user = data['user'];
      });
}
UpdateUser(){
  this.userService.updateUser(this.auth.decodeToken.nameid, this.user).subscribe(next =>{
    this.alert.success('Profile Updated');
    this.editForm.reset(this.user);
  }, error => {
    this.alert.error('updating fails')
  }
);

}
}