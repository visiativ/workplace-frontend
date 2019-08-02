import { OAuthModule } from 'angular-oauth2-oidc';
import { OidcLogoutComponent } from './oidc-logout/oidc-logout.component';
import { OidcLoginComponent } from './oidc-login/oidc-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    OidcLoginComponent,
    OidcLogoutComponent
  ],
  imports: [
    CommonModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: environment.apiUrls,
          sendAccessToken: true
      }
  })
  ]
})
export class MoovappsOidcModule { }
