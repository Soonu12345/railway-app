import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class loadingInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loadingContainer: HTMLElement = document.getElementsByClassName('loading').item(0) as HTMLElement;
        loadingContainer.style.display = 'block';
        //send the request
        next.handle(req).subscribe((observer: any) => {
            if (observer.status == 200) {
                loadingContainer.style.display = 'none';
            }
        })
        return next.handle(req);
    }
}