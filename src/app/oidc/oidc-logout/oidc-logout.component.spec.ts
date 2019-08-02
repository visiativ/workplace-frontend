import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcLogoutComponent } from './oidc-logout.component';

describe('OidcLogoutComponent', () => {
  let component: OidcLogoutComponent;
  let fixture: ComponentFixture<OidcLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OidcLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
