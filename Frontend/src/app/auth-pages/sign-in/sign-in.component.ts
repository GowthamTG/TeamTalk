import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    staySignedIn: [false],
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);

      this.apiService
        .onLogin({
          email: this.signInForm.value.username,
          password: this.signInForm.value.password,
        })
        .subscribe(
          (res: any) => {
            console.log(res);

            if (res.message === 'LOGIN_SUCCESS') {
              console.log(res);
              this.authService.login(res);
              this.signInForm.reset();
            }
          },
          (err: any) => {
            console.log(err);
          },
          () => {
            console.log('over');
          }
        );
    }
  }
}
