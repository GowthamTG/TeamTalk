import { Injectable } from '@angular/core';
import { Router, CanActivateChild, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild, CanActivate{
  constructor(private route: Router) { }
  canActivate():boolean{
    if(localStorage.getItem("id") === null ) return true;
    this.route.navigate(['/groups']);
    return false; 
  }
  canActivateChild():boolean{
    if(localStorage.getItem("id") !== null )return true;
    this.route.navigate(['/auth/login']).then(() => {
      window.location.reload();
    });
    return false; 
  }
}