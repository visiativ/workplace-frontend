import { JwksNoAtHashValidationHandler } from './token-validation/jwks-no-at-hash-validation-handler';
import { AuthenticationService } from './authentication.service';
import { AuthConfig, OAuthModuleConfig, ValidationHandler, JwksValidationHandler, OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AutenticationDebugComponent } from './debug/autentication-debug/autentication-debug.component';
import { LoginComponent } from './ui/login/login.component';

@NgModule({
  declarations: [AutenticationDebugComponent, LoginComponent],
  imports: [
    CommonModule,
    OAuthModule.forRoot()
  ],
  exports: [
    AutenticationDebugComponent,
    LoginComponent
  ]
})
export class AuthenticationModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthenticationService,
        OAuthService,
        { provide: AuthConfig, useFactory: this.authConfigFactory },
        { provide: OAuthModuleConfig, useFactory: this.authModuleConfigFactory },
        { provide: ValidationHandler, useClass: JwksNoAtHashValidationHandler }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthenticationModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static authModuleConfigFactory(): OAuthModuleConfig {
    return {
      resourceServer: {
        allowedUrls: ['https://demo.identityserver.io/api'],
        sendAccessToken: true,
      }
    };
  }

  static authConfigFactory(): AuthConfig {
    const authServer = 'http://keycloak:9080';
    const tenant = 'jhipster';
    return {
      // Url of the Identity Provider
      issuer: `${authServer}/auth/realms/${tenant}`,
      userinfoEndpoint: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/userinfo`,
      loginUrl: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/auth`,
      logoutUrl: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/logout`,
      requireHttps: false,
      redirectUri: window.location.origin,
      clientId: 'web_app',
      responseType: 'code',
      disableAtHashCheck: true, // keycloak need hybrid flow to set at_hash we disable this check

      // set the scope for the permissions the client should request
      // The first three are defined by OIDC. The 4th is a usecase-specific one
      scope: 'openid profile email offline_access api',
      showDebugInformation: true
    };
  }
}
