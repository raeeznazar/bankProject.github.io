import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  user: any;

  depositForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password1: ['', [Validators.required, Validators.pattern('[0-9a-zA-z]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });
  widrawForm = this.fb.group({
    acno2: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password2: ['', [Validators.required, Validators.pattern('[0-9a-zA-z]*')]],
    amount2: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  constructor(private ds: DataService, private fb: FormBuilder) {
    this.user = this.ds.currentuser;
  }

  ngOnInit(): void {}

  // calling funtion for deposit
  deposit() {
    var acno1 = this.depositForm.value.acno1;
    var password1 = this.depositForm.value.password1;
    var amount1 = this.depositForm.value.amount1;
    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno1, password1, amount1);

      if (result) {
        alert('Amount suucessfully deposited and new balance is' + result);
      }
    }
  }

  widraw() {
    var acno2 = this.widrawForm.value.acno2;
    var password2 = this.widrawForm.value.password2;
    var amount2 = this.widrawForm.value.amount2;
    if (this.widrawForm.valid) {
      const result = this.ds.widraw(acno2, password2, amount2);

      if (result) {
        alert('Amount suucessfully debitted and new balance is' + result);
      }
    }
  }
}
