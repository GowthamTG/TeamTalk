import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    number:['',[Validators.required]],
    email:['',[Validators.required]],
    password: ['', Validators.required],
    staySignedIn: [false],
  });
 
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {}


}
        
      
    
  



