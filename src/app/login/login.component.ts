import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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

  constructor(private router: Router, private db: DataService) {}

  ngOnInit(): void {}

  login() {
    var acno = this.acno;
    var pswd = this.pswd;

    let database = this.db.database;

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
