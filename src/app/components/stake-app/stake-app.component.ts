declare let window: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPiggyBank, faCoins, faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-stake-app',
  templateUrl: './stake-app.component.html',
  styleUrls: ['./stake-app.component.scss'],
  providers: [ContractService]
})
export class StakeAppComponent implements OnInit {
  //icons:
  faPiggyBank = faPiggyBank;
  faCoins = faCoins;
  faMoneyBillTransfer = faMoneyBillTransfer;

  stakingAbi = require('../../../abis/Staking.json');
  tokenAbi = require('../../../abis/Token.json');

  account: any;
  stakeInputValue: any;
  unstakeInputValue: any;
  buttonText!: string;

  public stakingAddress: string = '0xfDCF9A5dDc285c8b7f58b0A766106aE898B184E6';
  public tokenAddress: string = '0x4D35F0791154cb73bEF0472BdecC855d201Be8c6';
  public tokenContract: any;
  public stakingContract: any;
  public taxFees: any;
  public tvl: any;
  public callerBalance: any;
  public stakerBalance: any;
  public userRewards: any;

  constructor(private contractService: ContractService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.contractService.connectAccount();
    await this.accountsChanged();
    
    this.fetchData();

    this.buttonText = this.contractService.account.slice(0,4).concat('...')
    .concat(this.contractService.account.slice(-4, this.contractService.account.length));
  }

  async fetchData() {
    this.stakingContract = new ethers.Contract(this.stakingAddress, this.stakingAbi['abi'], this.contractService.signer);
    this.tokenContract = new ethers.Contract(this.tokenAddress, this.tokenAbi['abi'], this.contractService.signer);

    this.taxFees = await this.stakingContract.getFee();

    this.tvl = await this.stakingContract.getTVL();
    this.tvl = Number(ethers.utils.formatEther(this.tvl.toString())).toFixed(2);

    this.callerBalance = await this.tokenContract.balanceOf(this.contractService.account);
    this.callerBalance = Number(ethers.utils.formatEther(this.callerBalance.toString())).toFixed(2);

    this.stakerBalance = await this.stakingContract.getUserStakedBalance(this.contractService.account);
    this.stakerBalance = Number(ethers.utils.formatEther(this.stakerBalance.toString())).toFixed(2);

    this.userRewards = await this.stakingContract.calculateRewards(this.contractService.account);
    this.userRewards = Number(ethers.utils.formatEther(this.userRewards.toString())).toFixed(2);
  }

  accountsChanged() {
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length === 0) {
        this.router.navigate(['/landing-page'])
        .then(() =>{
          window.location.reload();
        });
      } else {
        this.contractService.account = await ethers.utils.getAddress(accounts[0]);
        window.location.reload();
      }
    });
  }

  stakeMax() {
    this.stakeInputValue = this.callerBalance;
  }

  unstakeMax() {
    this.unstakeInputValue = this.stakerBalance;
  }

  copyAddress() {
    let copyText = this.contractService.account;
    navigator.clipboard.writeText(copyText).then(() => {
      alert('Copied: ' + copyText);
    });
  }

   approve() {
    this.tokenContract.approve(this.stakingAddress, this.tokenContract.totalSupply(), {
      from: this.contractService.account
    });

    this.stakeInputValue = '';
  }

  async stake() {
    // if (await this.tokenContract.allowance(this.contractService.account, this.stakingAddress) ===  await this.tokenContract.totalSupply()) {
    //   alert("error");
    // }

    if (!this.stakeInputValue || this.stakeInputValue === 0 || this.stakeInputValue < 0) {
      alert('Required minimum deposit of 0.01');
      this.stakeInputValue = '';
    } else if (this.stakeInputValue > this.callerBalance) {
      alert('Unsufficent balance');
    } else {
      this.stakeInputValue = ethers.utils.parseEther(this.stakeInputValue.toString());

      this.stakingContract.stakeFlex(this.stakeInputValue, {
        from:this.contractService.account
      });
    }
    this.stakeInputValue = '';
  }

  unstake() {
    if (!this.unstakeInputValue || this.unstakeInputValue === 0 || this.unstakeInputValue < 0) {
      alert("Can't withdraw negative or empty amount !");
      this.unstakeInputValue = '';
    } else if (this.unstakeInputValue > this.stakerBalance) {
      alert('Unsufficent balance');
    } else {
      this.unstakeInputValue  = ethers.utils.parseEther(this.unstakeInputValue.toString());

      this.stakingContract.unstakeFlex(this.unstakeInputValue, {
        from:this.contractService.account
      });
    }
    this.unstakeInputValue = '';
  }

  claim() {
    if (this.userRewards === 0) {
      alert('No rewards available to collect !');
    } else {
      this.stakingContract.claimFlex({
        from:this.contractService.account
      });
    }
  }

}
