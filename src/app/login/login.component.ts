import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  errorText = "";
  valid = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async submitForm() {
    if (this.form.valid) {
      this.authService.login(this.form.value).catch(err => {
        if (err.status !== 0) {
          if (typeof err.error === "string") {
            this.errorText = err.error ? err.error : err.error.value
          }
        } else {
          this.errorText = "Server is not currently available, please try again."
        }
        this.valid = false;
        this.form.get("username")?.setValue("");
        this.form.get("password")?.setValue("");
      });
    }
  }
}
