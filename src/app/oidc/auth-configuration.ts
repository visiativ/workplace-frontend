import { AuthConfig } from 'angular-oauth2-oidc';

export const realmName = 'jhipster';
export const oidcServer = 'http://keycloak:9080';

export const AuthConfiguration: AuthConfig = {

  // Url of the Identity Provider
  issuer: `${oidcServer}/auth/realms/${realmName}`,
  userinfoEndpoint: `${oidcServer}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
  loginUrl: `${oidcServer}/auth/realms/${realmName}/protocol/openid-connect/auth`,
  logoutUrl: `${oidcServer}/auth/realms/${realmName}/protocol/openid-connect/logout`,
  requireHttps: false,
  redirectUri: window.location.origin + '/',
  clientId: 'web_app',
  responseType: 'code token id_token', // keycloak need hybrid flow to set at_hash

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email'
  // showDebugInformation: true

};
