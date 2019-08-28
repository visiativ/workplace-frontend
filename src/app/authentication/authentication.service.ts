import { environment } from './../../environments/environment.prod';
import { map, filter } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject, Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OAuthService, OAuthErrorEvent, AuthConfig } from 'angular-oauth2-oidc';
import { promise } from 'protractor';

@Injectable()
export class AuthenticationService {

  /**
   * Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
   * Only the ones where it's reasonably sure that sending the
   * user to the IdServer will help.
   */
  private static readonly ERROR_RESPONSES_REQUIRING_USER_INTERACTION = [
    'interaction_required',
    'login_required',
    'account_selection_required',
    'consent_required',
  ];

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);

  /**
   * is there any authentication?
   */
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  /**
   * is authentication process completed?
   */
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public readonly canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(map(values => values.every(b => b)));

  private hasValidAccessTokenSubject$ = new BehaviorSubject<boolean>(false);
  public readonly hasValidAccessToken$ = this.hasValidAccessTokenSubject$.asObservable();
  public readonly accessToken$: Observable<string | null> = this.hasValidAccessToken$
    .pipe(map(valid => valid ? this.oauthService.getAccessToken() : null));

  private hasValidIdTokenSubject$ = new BehaviorSubject<boolean>(false);
  public readonly hasValidIdToken$ = this.hasValidIdTokenSubject$.asObservable();
  public readonly idToken$: Observable<string | null> = this.hasValidIdToken$
    .pipe(map(valid => valid ? this.oauthService.getIdToken() : null));

  private identityClaimsSubject$ = new BehaviorSubject<object | null>(null);
  public readonly identityClaims$: Observable<object | null> = this.identityClaimsSubject$.asObservable();

  constructor(private oauthService: OAuthService, private authConfig: AuthConfig, private router: Router) {
    this.debug(() => {
      this.oauthService.events.subscribe(event => {
        if (event instanceof OAuthErrorEvent) {
          console.error(event);
        } else {
          console.warn(event);
        }
      });
    });

    /**
     * every event can update the autenticated status
     */
    this.oauthService.events.subscribe(event => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      this.hasValidAccessTokenSubject$.next(this.oauthService.hasValidAccessToken());
      this.hasValidIdTokenSubject$.next(this.oauthService.hasValidIdToken());
      this.identityClaimsSubject$.next(this.oauthService.getIdentityClaims());
    });

    this.oauthService.events
      .pipe(filter(event => ['token_received'].includes(event.type)))
      .subscribe(tokenReceivedEvent => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(filter(event => ['session_terminated', 'session_error'].includes(event.type)))
      .subscribe(sessionEvent => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  private navigateToLoginPage() {
    // TODO: Remember current URL
    this.router.navigateByUrl('/should-login');
  }

  public runInitialLoginSequence(): Promise<void> {

    this.debug(() => {
      if (location.hash) {
        console.log('Encountered hash fragment, plotting as table...');
        console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
      }
    });

    return this.oauthService.loadDiscoveryDocument()
      .then(() => this.trySilentLogin())
      // .then(() => this.trySilentRefresh())
      .then(() => {
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          console.log('There was state, so we are sending you to: ' + this.oauthService.state);
          this.router.navigateByUrl(this.oauthService.state);
        }
      })
      .catch(err => {
        console.warn('error durring silent login!');
        console.dir(err);
      })
      .finally(() => this.isDoneLoadingSubject$.next(true));
  }

  public login(): Promise<void> {
    this.oauthService.initCodeFlow();
    return this.oauthService.tryLoginCodeFlow();
  }

  /**
   * try to silent login with previous login.
   *
   */
  private trySilentLogin(): Promise<void> {
    return this.oauthService.tryLoginCodeFlow()
      .then(() => Promise.resolve())
      .catch((error) => {
        if (error
          && error.params
          && AuthenticationService.ERROR_RESPONSES_REQUIRING_USER_INTERACTION
            .indexOf(error.params.error) >= 0) {
          // At this point we know for sure that we have to ask the
          // user to log in, so we redirect them to the IdServer to
          // enter credentials.
          //
          // Enable this to ALWAYS force a user to login.
          // this.oauthService.initCodeFlow();
          //
          // Instead, we'll now do this:
          console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
          return Promise.resolve();
        }
      });
  }

  private debug(fn: () => void): void {
    if (!environment.production) {
      fn();
    }
  }

}
