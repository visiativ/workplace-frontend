import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OAuthService, OAuthErrorEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class ValideTokenGuardGuard implements CanActivate {

  constructor(private oauthService: OAuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.oauthService.events
        .pipe(filter((event, index) => event instanceof OAuthErrorEvent || event instanceof OAuthSuccessEvent))
        .pipe(map((event => {
          return event instanceof OAuthErrorEvent ? false : true;
        })));
  }

}
