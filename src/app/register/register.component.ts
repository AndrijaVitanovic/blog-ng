import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submitForm() {
     if (this.form.valid) {
       this.authService.register(this.form.value).subscribe(_ => {
         this.router.navigate(['/login']);
       })
     }
  }
}
