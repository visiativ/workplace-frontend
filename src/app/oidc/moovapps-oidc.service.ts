import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig, OAuthErrorEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoovappsOidcService {

  constructor(private oauthService: OAuthService) { }

  private configure() {
    this.oauthService.configure(this.buildAuthConfiguration('http://keycloak:9080', 'jhipster'));
    this.oauthService.setupAutomaticSilentRefresh();
    const jwksValidationHandler = new JwksValidationHandler();
    this.oauthService.tokenValidationHandler = jwksValidationHandler;
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      console.log('Logged in');
    }).catch(err => {
      console.log('Unable to login');
    });
  }

  checkAuthentication(): Observable<boolean> {
    return this.oauthService.events
    .pipe(filter((event, index) => event instanceof OAuthErrorEvent || event instanceof OAuthSuccessEvent))
    .pipe(map((event => {
      return event instanceof OAuthErrorEvent ? false : true;
    })));
  }

  private buildAuthConfiguration(authServer: string, tenant: string): AuthConfig {
    return {
      // Url of the Identity Provider
      issuer: `${authServer}/auth/realms/${tenant}`,
      userinfoEndpoint: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/userinfo`,
      loginUrl: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/auth`,
      logoutUrl: `${authServer}/auth/realms/${tenant}/protocol/openid-connect/logout`,
      requireHttps: false,
      redirectUri: window.location.origin + '/',
      clientId: 'web_app',
      responseType: 'code token id_token', // keycloak need hybrid flow to set at_hash

      // set the scope for the permissions the client should request
      // The first three are defined by OIDC. The 4th is a usecase-specific one
      scope: 'openid profile email'
      // showDebugInformation: true
    };
  }

}
