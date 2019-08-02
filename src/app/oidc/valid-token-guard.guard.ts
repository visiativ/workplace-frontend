import { MoovappsOidcService } from './moovapps-oidc.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { OAuthService, OAuthErrorEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuardGuard implements CanActivate {
  constructor(private moovappsOidcService: MoovappsOidcService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.moovappsOidcService.checkAuthentication();
  }
}
