import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Notification } from '../model/notification';
import { JwtService } from '../services/jwt.service';
import { NotificationService } from '../services/notification.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, AfterContentChecked {
  client: any;
  notifications: Notification[] = [];
  unreadCount = 0;
  opened = false;
  loggedIn = false;
  email: any;
  user: any;
  profilePicture: any;

  constructor(
    private jwt: JwtService,
    private notificationService: NotificationService,
    private cdref: ChangeDetectorRef,
    private userService: UserService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connect();
    this.getUserByEmail();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  public connect() {
    const token = this.jwt.getToken();
    if (!token) return;
    let username = this.jwt.decodeToken(token)?.sub ?? '';
    const authHeader = 'Bearer ' + this.jwt.getToken();
    const headers = { Authorization: authHeader };
    const socket = new SockJS(`${environment.baseApi}/ws`);
    this.client = Stomp.over(socket);
    this.client.debug = () => {};
    this.client.connect(headers, () => {
      this.client.subscribe(
        `/user/${username}/notifications`,
        (message: any) => {
          const notification = JSON.parse(message.body);
          if ('length' in notification) {
            this.notifications.unshift(...notification);
          } else {
            this.notifications.unshift(notification);
          }
          this.unreadCount = this.notifications.filter(
            (notification) => !notification?.seenTime
          ).length;
          this.cdref.detectChanges();
        }
      );
    });
  }

  seenNotification(notificationId: number) {
    if (
      this.notifications.find((notif) => notif.id === notificationId)
        ?.seenTime !== null
    ) {
      return;
    }
    this.notificationService.markSeen(notificationId).then(() => {
      this.notifications[
        this.notifications.findIndex((notif) => notif.id === notificationId)
      ].seenTime = new Date().toISOString();
      this.notifications = [...this.notifications];
      this.unreadCount = this.notifications.filter(
        (notif) => !notif.seenTime
      ).length;
    });
  }

  isLoggedIn() {
    return (this.loggedIn = this.jwt.isLoggedIn());
  }

  logout() {
    this.jwt.logout();
    this.user = undefined;
    this.notifications = [];
    this.unreadCount = 0;
    window.location.reload();
  }

  getUserByEmail() {
    this.email = this.jwt.getDecodedToken()?.sub;
    if (!this.email) return;
    this.userService.getUserByEmail(this.email).subscribe((data) => {
      this.user = data;
      let objectURL = 'data:image/jpeg;base64,' + this.user.image;
      this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  public openDialog(notificationId?: number, title?: string, body?: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: notificationId,
      title: title,
      body: body,
    };

    this.dialog
      .open(NotificationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }

  routeToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }
}
