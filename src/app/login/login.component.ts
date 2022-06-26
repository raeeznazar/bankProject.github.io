import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
  });

  constructor(
    private router: Router,
    private db: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;
    if (this.loginForm.valid) {
      this.db
        .login(acno, pswd)

        .subscribe(
          (result: any) => {
            if (result) {
              localStorage.setItem(
                'currentAcno',
                JSON.stringify(result.currentAcno)
              );
              localStorage.setItem(
                'currentuser',
                JSON.stringify(result.currentuser)
              );

              localStorage.setItem('token', JSON.stringify(result.token));
              alert(result.message);
              this.router.navigateByUrl('dashboard');
            }
          },
          (result) => {
            alert(result.error.message);
          }
        );
    }
  }
}
