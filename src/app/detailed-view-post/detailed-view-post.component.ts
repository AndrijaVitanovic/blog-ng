import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailedViewPostService } from '../services/detailed-view-post.service';
import { UtilityService } from '../services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommentDialogComponent } from '../create-comment-dialog/create-comment-dialog.component';

@Component({
  selector: 'app-detailed-view-post',
  templateUrl: './detailed-view-post.component.html',
  styleUrls: ['./detailed-view-post.component.scss'],
})
export class DetailedViewPostComponent implements OnInit {
  routing: any;
  post: any;
  id: any;
  user: any;
  profilePicture: any;
  rating: any;

  constructor(
    private router: Router,
    private service: DetailedViewPostService,
    private utilityService: UtilityService,
    public dialog: MatDialog
  ) {
    this.routing = this.router.getCurrentNavigation()?.extras?.state;
    this.id = this.routing?.id;
    if (this.id) localStorage.setItem('detailedView', this.id);
    this.getPostById();
  }

  getPostById() {
    const id = localStorage.getItem('detailedView');
    this.service.getPostById(id).subscribe((data) => {
      this.post = data;
    });
  }

  ngOnInit(): void {
    this.getPostById();
  }

  public calculateCreatedDate(timestamp: any) {
    return this.utilityService.calculateCreatedDate(timestamp);
  }

  public roundRating() {
    return (this.rating = this.utilityService.roundRating(
      this.post?.likes - this.post?.dislikes
    ));
  }

  getProfilePicture(user: any) {
    return this.utilityService.getProfilePicture(user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCommentDialogComponent);

    dialogRef.afterClosed().subscribe((_) => {
      this.getPostById();
    });
  }
}
