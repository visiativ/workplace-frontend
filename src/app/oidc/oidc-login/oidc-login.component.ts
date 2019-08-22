import { Component, OnInit } from '@angular/core';
import { MoovappsOidcService } from '../moovapps-oidc.service';

@Component({
  selector: 'app-oidc-login',
  templateUrl: './oidc-login.component.html',
  styleUrls: ['./oidc-login.component.scss']
})
export class OidcLoginComponent implements OnInit {

  constructor(private moovappsOidcService: MoovappsOidcService) { }

  ngOnInit() {
    this.moovappsOidcService.runInitialLoginSequence();
  }

}
