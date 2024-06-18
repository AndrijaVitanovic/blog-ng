import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { ContentPolicyComponent } from './terms/content-policy/content-policy.component';
import { PrivacyPolicyComponent } from './terms/privacy-policy/privacy-policy.component';
import { DetailedViewPostComponent } from './detailed-view-post/detailed-view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'content-policy',
    component: ContentPolicyComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'detailed-view-post',
    component: DetailedViewPostComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
