import { ValideTokenGuardGuard } from './oidc/valide-token-guard.guard';
import { ClaimsComponent } from './oidc/claims/claims.component';
import { NotAuthorizedComponent } from './error/not-authorized/not-authorized.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: ClaimsComponent, canActivate: [ValideTokenGuardGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
