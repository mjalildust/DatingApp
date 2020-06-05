import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditeResolver implements Resolve<User>{
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router, private auth: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.auth.decodeToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem retrieving your data');
                this.router.navigate(['/member']);
                return of(null);
            })
        );
    }
}