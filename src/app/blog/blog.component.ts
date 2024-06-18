import { Component, OnInit, Sanitizer } from '@angular/core';
import { LandingPageService } from '../services/landing-page.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  isFetching: boolean;
  posts: any[] = [];
  user: any;
  profilePicture: any;
  showComments = false;

  constructor(
    private landingPageService: LandingPageService,
    private jwt: JwtService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.isFetching = true;
    this.landingPageService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.isFetching = false;
    });
  }

  public calculateCreatedDate(timestamp: any) {
    return this.utilityService.calculateCreatedDate(timestamp);
  }

  public roundRating(ratio: any) {
    return this.utilityService.roundRating(ratio);
  }

  public shouldBlur(text: any): boolean {
    return text.length > 300;
  }

  getProfilePicture(user: any) {
    return this.utilityService.getProfilePicture(user);
  }

  routeToDetailedView(post: any) {
    this.router.navigateByUrl('/detailed-view-post', {
      state: { id: post.id },
    });
  }

  public upvote(post: any) {
    this.landingPageService.upvote(post).subscribe(() => {
      this.getAllPosts();
    });
  }

  public downvote(post: any) {
    this.landingPageService.downvote(post).subscribe(() => {
      this.getAllPosts();
    });
  }

  public getAllPostsByCategoryId(categoryId: number) {
    this.landingPageService
      .getAllPostsByCategoryId(categoryId)
      .subscribe((data) => {
        this.posts = data;
      });
  }
}
