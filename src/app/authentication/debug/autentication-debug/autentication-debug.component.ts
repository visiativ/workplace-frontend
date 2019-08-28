import { AuthenticationService } from './../../authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autentication-debug',
  templateUrl: './autentication-debug.component.html',
  styleUrls: ['./autentication-debug.component.scss']
})
export class AutenticationDebugComponent implements OnInit {

  public authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
  }

}
