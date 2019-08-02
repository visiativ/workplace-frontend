import { MoovappsOidcModule } from './oidc/moovapps-oidc.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NotAuthorizedComponent } from './error/not-authorized/not-authorized.component';
import { OidcLoginComponent } from './oidc/oidc-login/oidc-login.component';
import { HomeComponent } from './view/home/home.component';
import { OidcLogoutComponent } from './oidc/oidc-logout/oidc-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MoovappsOidcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
