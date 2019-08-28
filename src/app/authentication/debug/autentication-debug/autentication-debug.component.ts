import { map } from 'rxjs/operators';
import { AuthenticationService } from './../../authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autentication-debug',
  templateUrl: './autentication-debug.component.html',
  styleUrls: ['./autentication-debug.component.scss']
})
export class AutenticationDebugComponent implements OnInit {

  public authenticationService: AuthenticationService;

  public identityClaimsPretty$: Observable<string>;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
    this.identityClaimsPretty$ = this.authenticationService.identityClaims$
      .pipe(map(claim => JSON.stringify(claim, null, 2)));
  }

  ngOnInit() {
  }

}
