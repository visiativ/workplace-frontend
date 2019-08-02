import { TestBed, async, inject } from '@angular/core/testing';

import { ValidTokenGuardGuard } from './valid-token-guard.guard';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';

describe('ValideTokenGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidTokenGuardGuard, OAuthService],
      imports: [ OAuthModule]
    });
  });

  // it('should ...', inject([ValideTokenGuardGuard, OAuthService], (guard: ValideTokenGuardGuard) => {
  //   expect(guard).toBeTruthy();
  // }));
});
