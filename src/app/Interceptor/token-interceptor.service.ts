import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { ApiPipeService } from '../Services/api-pipe.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{
  constructor(private injector: Injector) { }

  intercept(req : HttpRequest<any>, next:HttpHandler){
    let authservice = this.injector.get(ApiPipeService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}

