import { AuthConfiguration } from './oidc/auth-configuration';
import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workplace';

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(AuthConfiguration);
    this.oauthService.setupAutomaticSilentRefresh();
    const jwksValidationHandler = new JwksValidationHandler();
    this.oauthService.tokenValidationHandler = jwksValidationHandler;
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      console.log("Logged in");
    }).catch(err => {
      console.log("Unable to login");
    });
  }

  public login() {
    this.oauthService.initCodeFlow();
  }
}
