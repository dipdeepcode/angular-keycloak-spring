import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom, inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, ExtraOptions, TitleStrategy } from '@angular/router';
import { routes } from 'app/app.routes';
import { CustomTitleStrategy } from 'app/common/title-strategy.injectable';
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticationInterceptor} from "./common/authentication-interceptor";


const routeConfig: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled'
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes, routeConfig), BrowserAnimationsModule, HttpClientModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory:  (authenticationService: AuthenticationService) => {
    //     return () => authenticationService.init();
    //   },
    //   multi: true,
    //   deps: [AuthenticationService]
    // },
    provideAppInitializer(() => {
      const authenticationService = inject(AuthenticationService);
      return authenticationService.init();
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ]
};
