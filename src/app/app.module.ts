import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserAuthGuardService } from './services/user-auth-guard.service';
import { JwtInterceptor } from './util/jwt.interceptor';
import { SnackbarHandler } from './util/snackbar-handler';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { NotSeenNotifCountPipe } from './pipes/not-seen-notif-count.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationDialogComponent } from './navbar/notification-dialog/notification-dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentPolicyComponent } from './terms/content-policy/content-policy.component';
import { PrivacyPolicyComponent } from './terms/privacy-policy/privacy-policy.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DetailedViewPostComponent } from './detailed-view-post/detailed-view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCommentDialogComponent } from './create-comment-dialog/create-comment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    BlogComponent,
    NotSeenNotifCountPipe,
    NotificationDialogComponent,
    SidebarComponent,
    ContentPolicyComponent,
    PrivacyPolicyComponent,
    TruncatePipe,
    DetailedViewPostComponent,
    CreatePostComponent,
    CreateCommentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
  providers: [
    AdminAuthGuardService,
    UserAuthGuardService,
    SnackbarHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
