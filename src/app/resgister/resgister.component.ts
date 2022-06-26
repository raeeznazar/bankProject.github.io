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
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(
    private ds: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    var uname = this.registerForm.value.uname;
    var acno = this.registerForm.value.acno;
    var password = this.registerForm.value.password;

    if (this.registerForm.valid) {
      //asynchronous
      this.ds.register(uname, acno, password)
      .subscribe(
        (result: any) => {
          if (result) {
            alert(result.message);
            this.router.navigateByUrl('');
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }
}
