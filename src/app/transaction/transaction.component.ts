import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  user: any;
  transaction: any;
  acno: any;
  balance: any;
  constructor(private ds: DataService) {
    //// for user appear in transaction page
    this.user = this.ds.currentuser;
/// for transaction details
    this.acno = this.ds.currentAcno;
    this.transaction = this.ds.transaction(this.acno);
    console.log(this.transaction);
    this.balance = this.ds.getBalance(this.acno);
  }

  ngOnInit(): void {}
}
