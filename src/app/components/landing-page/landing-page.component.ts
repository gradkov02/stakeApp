declare let window: any;
import { Component, OnInit } from '@angular/core';
import { faDiscord, faTwitter, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { ContractService } from 'src/app/services/contract.service';
import { ethers } from 'ethers';
import { Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [ContractService]
})
export class LandingPageComponent implements OnInit {

  faDiscord = faDiscord;
  faTwitter = faTwitter;
  faTelegram = faTelegram;
  faGitHub = faGithub;

  account: string = '';
  signer: any;

  constructor(private contractService: ContractService, public router: Router) { }

  ngOnInit(): void {
    
  }

  async connectAccount() {
    if (window.ethereum) {  
      await this.contractService.connectAccount()
      .then(() =>{
        this.checkConnection();
      });
  }
}

  checkConnection() {
    if (this.contractService.account) {
      this.router.navigate(['/stake-app'])
      .then(() =>{
        window.location.reload();
      });
    }
  }

}
