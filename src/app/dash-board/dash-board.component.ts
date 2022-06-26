import { BuiltinTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loginDate: any;
  delAcno: any;

  constructor(
    private ds: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // this.user = this.ds.currentuser;
    this.user = JSON.parse(localStorage.getItem('currentuser') || '');
    this.loginDate = new Date();
  }

  ngOnInit(): void {
    // if (!localStorage.getItem('currentAcno')) {
    //   alert('Please login');
    //   this.router.navigateByUrl('');
    // }
  }

  // calling funtion for deposit
  deposit() {
    var acno1 = this.depositForm.value.acno1;
    var password1 = this.depositForm.value.password1;
    var amount1 = this.depositForm.value.amount1;
    if (this.depositForm.valid) {
      this.ds.deposit(acno1, password1, amount1).subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
    }
  }

  widraw() {
    var acno2 = this.widrawForm.value.acno2;
    var password2 = this.widrawForm.value.password2;
    var amount2 = this.widrawForm.value.amount2;
    if (this.widrawForm.valid) {
      this.ds
        .widraw(acno2, password2, amount2)

        .subscribe(
          (result: any) => {
            if (result) {
              alert(result.message);
            }
          },
          (result) => {
            alert(result.error.message);
          }
        );
    }
  }

  // Log Out
  logout() {
    localStorage.removeItem('currentuser');
    localStorage.removeItem('currentAcno');
    this.router.navigateByUrl('');
  }

  // delete from parent for deletebtn

  deleteFromParent() {
    this.delAcno = JSON.parse(localStorage.getItem('currentAcno') || '');
  }

  onDashCancel() {
    this.delAcno = '';
  }
  onDashDelete(event: any) {
    // alert('Delete the account numner ' + event);
    // calling onDashDelete in DataService
    this.ds.onDashDelete(event)
    .subscribe((result: any) => {
        if (result) {
          alert(result.message);
          this.router.navigateByUrl("")
        }
      },
      (result:any) => {
        alert(result.error.message);
      }
    );

    
  }
}
