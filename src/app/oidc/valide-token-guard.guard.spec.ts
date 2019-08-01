import { TestBed, async, inject } from '@angular/core/testing';

import { ValideTokenGuardGuard } from './valide-token-guard.guard';

describe('ValideTokenGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValideTokenGuardGuard]
    });
  });

  it('should ...', inject([ValideTokenGuardGuard], (guard: ValideTokenGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
