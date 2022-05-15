import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  acno1 = '';
  password1 = '';
  amount1 = '';
  acno2 = '';
  password2 = '';
  amount2 = '';

  constructor(private ds: DataService) {}

  ngOnInit(): void {}

  // calling funtion for deposit
  deposit() {
    var acno1 = this.acno1;
    var password1 = this.password1;
    var amount1 = this.amount1;
    const result = this.ds.deposit(acno1, password1, amount1);

    if (result) {
      alert('Amount suucessfully deposited and new balance is' + result);
    }
  }

  widraw() {
    var acno2 = this.acno2;
    var password2 = this.password2;
    var amount2 = this.amount2;
    const result = this.ds.widraw(acno2, password2, amount2);

    if (result) {
      alert('Amount suucessfully debitted and new balance is' + result);
    }
  }
}
