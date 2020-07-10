import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/User.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  @ViewChild('memberTabs', {static: true}) memberTabs:TabsetComponent ;


  constructor(private alertify: AlertifyService, private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe( data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params=> {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ?selectedTab:0].active = true;
    })
  }

  selectTab(tabId: number){
    console.log(tabId);
    this.memberTabs.tabs[tabId].active = true;
  }

}
