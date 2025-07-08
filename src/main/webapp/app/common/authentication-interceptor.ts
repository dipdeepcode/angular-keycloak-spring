import {from, lastValueFrom, Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {inject, Injectable} from "@angular/core";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  authenticationService = inject(AuthenticationService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.addHeader(request, next));
  }

  private async addHeader(request: HttpRequest<any>, next: HttpHandler) {
    const token = await this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return await lastValueFrom(next.handle(request));
  }

}
