import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { DialogComponent } from 'src/app/dialog/dialog.component';

import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    reenterPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      this.apiService.onRegister(this.signUpForm.value).subscribe(
        (res: any) => {
          console.log(res);

          if (res.message === `User Created`) {
            console.log(res);
            // this.authService.login(res);
            // this.signUpForm.reset();
            this.dialog.open(DialogComponent, {
              data: {
                heading: `User Created`,
                message: `User Created Successfully`,
              },
            });
            this.router.navigate(['auth', 'login']);
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('over');
        }
      );
    }
  }
}
