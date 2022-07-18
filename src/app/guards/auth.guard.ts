import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ContractService } from '../services/contract.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private contractService: ContractService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if(!this.contractService.account) {
    //   this.router.navigate(['/landing-page']);
    //   return false;
    // } else {
    //   return true;
    // }
    // return this.contractService.isConnected;
    return true;
  }
}
// TODO!