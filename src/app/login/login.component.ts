import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  

  constructor(private router: Router, private db: DataService, ) {}

  ngOnInit(): void {}

  login() {
    var acno = this.acno;
    var pswd = this.pswd;

    const result = this.db.login(acno, pswd);
    if (result) {
      alert('Login successfull');
      this.router.navigateByUrl('dashboard');
    }
  }
}
