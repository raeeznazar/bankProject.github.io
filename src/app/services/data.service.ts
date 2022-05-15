import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //database
  database: any = {
    1000: { acno: 1000, uname: 'raeez', password: 1000, balance: 100 },
    1001: { acno: 1001, uname: 'florie', password: 1001, balance: 150 },
    1002: { acno: 1002, uname: 'Vyom', password: 1002, balance: 200 },
  };
  constructor() {}
  // register(uname:any,acno:any,password:any)
  register(uname: any, acno: any, password: any) {
    let database = this.database;
    // already exist acno
    if (acno in database) {
      return false;
    } else {
      // add details to db
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
      };
      return true;
    }
  }
  // login
  login(acno: any, pswd: any) {
    let database = this.database;
    // already in database
    if (acno in database) {
      if (pswd == database[acno]['password']) {
        return true;
      } else {
        alert('Incorrect password');
        return false;
      }
    } else {
      alert('user does not exist');
      return false;
    }
  }

  // Deposit

  deposit(acnoDepo: any, password: any, amt: any) {
    var amount = parseInt(amt);
    let database = this.database;

    if (acnoDepo in database) {
      if (password == database[acnoDepo]['password']) {
        database[acnoDepo]['balance'] += amount;
        return database[acnoDepo]['balance'];
      } else {
        alert('invalid password');
        return false;
      }
    } else {
      alert('Account number does not exist');
      return false;
    }
  }

  // Deposit

  widraw(acnoWidraw: any, password: any, amt: any) {
    var amount = parseInt(amt);
    let database = this.database;

    if (acnoWidraw in database) {
      if (password == database[acnoWidraw]['password']) {
        if (database[acnoWidraw]['balance'] >= amount) {
          database[acnoWidraw]['balance'] -= amount;
          return database[acnoWidraw]['balance'];
        } else {
          alert('insufficient balance');
          return false;
        }
      } else {
        alert('invalid password');
        return false;
      }
    } else {
      alert('Account number does not exist');
      return false;
    }
  }
}
