import { TestBed, async, inject } from '@angular/core/testing';

import { ValideTokenGuardGuard } from './valide-token-guard.guard';
import { OAuthService } from 'angular-oauth2-oidc';

describe('ValideTokenGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValideTokenGuardGuard, OAuthService]
    });
  });

  it('should ...', inject([ValideTokenGuardGuard], (guard: ValideTokenGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
