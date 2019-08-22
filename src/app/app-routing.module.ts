import { OidcLogoutComponent } from './oidc/oidc-logout/oidc-logout.component';
import { HomeComponent } from './view/home/home.component';
import { OidcLoginComponent } from './oidc/oidc-login/oidc-login.component';
import { ValidTokenGuard } from './oidc/valid-token.guard';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ValidTokenGuard] },
  { path: 'login', component: OidcLoginComponent },
  { path: 'logout', component: OidcLogoutComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
