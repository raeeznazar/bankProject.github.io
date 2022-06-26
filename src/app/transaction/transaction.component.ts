import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  user: any;
  transactions: any;
  acno: any;
  balance: any;
  constructor(private ds: DataService) {
    //// for user appear in transaction page
    this.user = JSON.parse(localStorage.getItem('currentuser') || '');
    /// for transaction details
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
    // this.transaction =
    this.ds.transaction(this.acno).subscribe(
      (result: any) => {
        if (result) {
          this.transactions = result.transaction;
          this.balance = result.balance;
        }
      },
      (result) => {
        alert(result.error.message);
      }
    );

    // // console.log(this.transaction);
    // this.balance = this.ds.getBalance(this.acno);
  }

  ngOnInit(): void {}
}
