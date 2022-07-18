declare let window: any;
import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { ethers, providers, Signer } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  
  signer: any;
  provider: any;
  accounts: string[] = [];
  account!: string;
  chainId: any;
  isConnected!: boolean;

  constructor() { }

  async connectAccount() {
    if (window.ethereum) {  
      this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      this.signer = this.provider.getSigner();
      await this.fetchAccounts();
      this.isConnected = true;
    }
  }
  
  
  async fetchAccounts() {
    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = await ethers.utils.getAddress(this.accounts[0]);
  }
}
