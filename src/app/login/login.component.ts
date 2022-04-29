import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aim = 'Your perfect banking partner';
  placeHold = 'account number please';
  acno = '';
  pswd = '';

  //database
  database: any = {
    1000: { acno: 1000, uname: 'raeez', password: 1000, balance: 50000 },
    1001: { acno: 1001, uname: 'florie', password: 1001, balance: 10000 },
    1002: { acno: 1002, uname: 'Vyom', password: 1002, balance: 5000 },
  };
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // login() {
  //   var acno = this.acno;
  //   var pswd = this.pswd;

  //   let database = this.database;

  //   if (acno in database) {
  //     if (pswd == database[acno]['password']) {
  //       alert('login sucessfully');
  //     } else {
  //       alert('invalid password');
  //     }
  //   } else {
  //     alert('user does not exist');
  //   }
  // }

  // login using template referencing
  // login(a: any, p: any) {
  //   var acno = a.value;
  //   var pswd = p.value;

  //   let database = this.database;

  //   if (acno in database) {
  //     if (pswd == database[acno]['password']) {
  //       alert('login sucessfully');
  //     } else {
  //       alert('invalid password');
  //     }
  //   } else {
  //     alert('user does not exist');
  //   }
  // }

  // login using ngModule (two way binding)

  login() {
    var acno = this.acno;
    var pswd = this.pswd;

    let database = this.database;

    if (acno in database) {
      if (pswd == database[acno]['password']) {
        alert('login sucessfully');
        this.router.navigateByUrl('dashboard');
      } else {
        alert('invalid password');
      }
    } else {
      alert('user does not exist');
    }
  }
}
