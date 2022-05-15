import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css'],
})
export class ResgisterComponent implements OnInit {
  uname = '';
  acno = '';
  password = '';
  // registerForm Model
  registerForm = this.fb.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    acno: [''],
    password: [''],
  });
  constructor(
    private db: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.get('uname')?.errors) {
      var uname = this.registerForm.value.uname;
      var acno = this.registerForm.value.acno;
      var password = this.registerForm.value.password;
      const result = this.db.register(uname, acno, password);

      if (result) {
        alert('sucessfully registered');
        this.router.navigateByUrl('');
      } else {
        alert('Account already exist, please login');
      }
    } else {
      alert('Invalid form');
    }
  }
}
