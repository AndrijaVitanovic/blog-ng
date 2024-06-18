import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePostService } from '../services/create-post.service';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  categories: any = [];
  loggedUserInfo: any;
  form: FormGroup;
  errorText = '';
  valid = true;
  formatData: any;

  constructor(
    private fb: FormBuilder,
    private createPostService: CreatePostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private jwt: JwtService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      excerpt: ['', Validators.required],
      slug: ['', Validators.required],
      category: [{}, Validators.required],
    });
  }

  ngOnInit(): void {
    const token = this.jwt.getToken();
    if (!token) return;
    let email = this.jwt.decodeToken(token)?.sub ?? '';

    this.userService.getUserByEmail(email).subscribe((data) => {
      this.loggedUserInfo = data;
    });

    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  async submitForm() {
    this.formatData = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      excerpt: this.form.get('excerpt')?.value,
      slug: this.form.get('slug')?.value,
      user: this.loggedUserInfo,
      category: this.form.get('category')?.value,
    };
    if (this.form.valid) {
      this.createPostService.createPost(this.formatData).subscribe((data) => {
        console.log(data);
      });
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 2500);
    } else {
      this.errorText = 'Sva polja su obavezna!';
    }
  }
}
