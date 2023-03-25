import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, PreloadingStrategy, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectiveStrategyGuard implements PreloadingStrategy {
 
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preload']) {
      return fn();
    }
    return of(null);
  }

}
