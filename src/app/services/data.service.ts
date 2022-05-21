import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentuser: any;
  currentAcno: any;

  //database
  database: any = {
    1000: {
      acno: 1000,
      uname: 'raeez',
      password: 1000,
      balance: 100,
      transaction: [],
    },
    1001: {
      acno: 1001,
      uname: 'florie',
      password: 1001,
      balance: 150,
      transaction: [],
    },
    1002: {
      acno: 1002,
      uname: 'Vyom',
      password: 1002,
      balance: 200,
      transaction: [],
    },
  };
  constructor() {
    this.getDetails();
  }

  // save data

  saveDetails() {
    localStorage.setItem('database', JSON.stringify(this.database));
    if (this.currentuser) {
      localStorage.setItem('currentuser', JSON.stringify(this.currentuser));
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno));
    }
  }

  // getDetails
  getDetails() {
    if (localStorage.getItem('database')) {
      this.database = JSON.parse(localStorage.getItem('database') || '');
    }
    if (localStorage.getItem('currentuser')) {
      this.currentuser = JSON.parse(localStorage.getItem('currentuser') || '');
    }
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '');
    }
  }

  getBalance(acno: any) {
    return this.database[acno].balance;
  }
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
        transaction: [],
      };
      this.saveDetails();

      return true;
    }
  }
  // login
  login(acno: any, pswd: any) {
    let database = this.database;
    // already in database
    if (acno in database) {
      if (pswd == database[acno]['password']) {
        this.currentuser = database[acno]['uname'];
        this.currentAcno = acno;
        this.saveDetails();
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
        database[acnoDepo]['transaction'].push({
          type: 'CREDIT',
          amount: amount,
        });
        // console.log(database);
        this.saveDetails();

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
          database[acnoWidraw]['transaction'].push({
            type: 'DEBIT',
            amount: amount,
          });
          this.saveDetails();

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

  //transaction

  transaction(acno: any) {
    return this.database[acno].transaction;
  }

  // logout

  logout(){
    
  }
}
