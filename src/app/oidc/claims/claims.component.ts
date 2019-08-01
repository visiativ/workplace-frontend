import { Component, OnInit } from '@angular/core';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {

  public userProfile: object;
  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
    this.oauthService.loadUserProfile()
    .then(userProfile => this.userProfile = userProfile)
    .catch(err => {
      debugger
      console.dir(err);
    });
  }

}
