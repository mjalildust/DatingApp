import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private route: Router) {
  }

  ngOnInit() {
    this.createRegisterFprm();
  }

  createRegisterFprm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(9)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});

  }
  passwordMatchValidator(g: FormGroup){
    // tslint:disable-next-line: object-literal-key-quotes
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid)
    {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(
          () => { this.alertify.success('Registeration Successfull!'); },
          error => { this.alertify.error(error); },
          () => { this.authService.login(this.user).subscribe( () => { this.route.navigate(['/members']);
        });
      });
    }
  }

Cancel(){
  this.cancelRegister.emit(false);
  this.alertify.message('cancel');
}

}
