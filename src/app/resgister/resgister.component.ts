import { Component, OnInit } from '@angular/core';
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
  constructor(private db: DataService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    var uname = this.uname;
    var acno = this.acno;
    var password = this.password;
    const result = this.db.register(uname, acno, password);

    if (result) {
      alert('sucessfully registered');
      this.router.navigateByUrl('');
    } else {
      alert('Account already exist, please login');
    }
  }
}
