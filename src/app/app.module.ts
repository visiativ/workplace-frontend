import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NotAuthorizedComponent } from './error/not-authorized/not-authorized.component';
import { ClaimsComponent } from './oidc/claims/claims.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    ClaimsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: environment.apiUrls,
          sendAccessToken: true
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
