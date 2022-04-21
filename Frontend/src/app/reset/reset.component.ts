import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
  resetForm = this.fb.group({
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
    staySignedIn: [false],
  });
 
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router 
  ) {} 


  ngOnInit(): void { }
    onSubmit() {
      if(this.resetForm.valid) {
        console.log(this.resetForm.value);

        this.apiService
        .onLogin({
          password: this.resetForm.value.password,
          newpassword: this.resetForm.value.password,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
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



