import {inject, Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  keycloak?: Keycloak;
  router = inject(Router);

  constructor() { }

  async init() {
    this.keycloak = new Keycloak(environment.keycloakConfig);
    await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
    });
  }

  async login(targetUrl?: string) {
    await this.keycloak?.login({
      redirectUri: location.origin + (targetUrl || '/')
    });
  }

  isLoggedIn() {
    return this.keycloak?.authenticated;
  }

  async logout() {
    await this.keycloak?.logout({
      redirectUri: location.origin + '?logoutSuccess=true'
    });
  }

  async getToken() {
    if (!this.isLoggedIn()) {
      return null;
    }
    if (this.keycloak?.isTokenExpired()) {
      try {
        await this.keycloak.updateToken(1);
      } catch (error) {
        return null;
      }
    }
    return this.keycloak?.token;
  }
}
