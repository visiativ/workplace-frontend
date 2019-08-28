import { JwksValidationHandler, ValidationParams } from 'angular-oauth2-oidc';

export class JwksNoAtHashValidationHandler extends JwksValidationHandler {
  validateAtHash(params: ValidationParams): Promise<boolean> {
    return Promise.resolve(true);
  }
}
