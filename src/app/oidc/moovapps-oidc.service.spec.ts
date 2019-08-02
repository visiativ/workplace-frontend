import { TestBed } from '@angular/core/testing';

import { MoovappsOidcService } from './moovapps-oidc.service';

describe('MoovappsOidcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoovappsOidcService = TestBed.get(MoovappsOidcService);
    expect(service).toBeTruthy();
  });
});
