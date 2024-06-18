import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { DetailedViewPostService } from '../services/detailed-view-post.service';

@Component({
  selector: 'app-create-comment-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrls: ['./create-comment-dialog.component.scss'],
})
export class CreateCommentDialogComponent implements OnInit {
  form: FormGroup;
  formatData: any;
  loggedUserInfo: any;
  postId: any;
  postData: any;
  constructor(
    public dialogRef: MatDialogRef<CreateCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private jwt: JwtService,
    private postService: DetailedViewPostService
  ) {
    this.form = this.fb.group({
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = this.jwt.getToken();
    if (!token) return;
    let email = this.jwt.decodeToken(token)?.sub ?? '';

    this.userService.getUserByEmail(email).subscribe((data) => {
      this.loggedUserInfo = data;
    });

    this.postId = localStorage.getItem('detailedView');

    this.postService.getPostById(this.postId).subscribe((data) => {
      this.postData = data;
    });
  }

  async submitForm() {
    this.formatData = {
      body: this.form.get('body')?.value,
      user: this.loggedUserInfo,
      post: this.postData,
    };
    if (this.form.valid) {
      this.postService.createComment(this.formatData).subscribe((data) => {
        console.log(data);
      });
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    } else {
      console.log('Some error occured!');
    }
  }
}
