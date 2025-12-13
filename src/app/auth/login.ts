import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from './auth-service';
import { LoginResquest } from './login-resquest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  form!: UntypedFormGroup;
  constructor(private AuthService:AuthService,private router:Router) {
    
  }
  ngOnInit(): void {

    this.form = new UntypedFormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }
  onSubmit() {
    let loginRequest=<LoginResquest>{
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value
    };
    this.AuthService.login(loginRequest).subscribe({ 
      next:result=>{
        console.log("Login successful",result);
      },
      error:result=>{
        console.error("Login failed",result);
      }
    });
    
}
}

