import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
import { debounceTime } from 'rxjs';

const options = {
  headers: new HttpHeaders(),
};
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
  constructor(private http: HttpClient) {
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
    //req body
    const data = {
      uname,
      acno,
      password,
    };
    //register API call
    return this.http.post('http://localhost:3000/register', data);
  }
  // login
  login(acno: any, pswd: any) {
    // req body
    const data = {
      acno,
      pswd,
    };

    //login API call
    return this.http.post('http://localhost:3000/login', data);
  }

  // Deposit

  deposit(acnoDepo: any, password: any, amt: any) {
    // req body
    const data = {
      amt,
      acnoDepo,
      password,
    };

    //login API call
    return this.http.post(
      'http://localhost:3000/deposit',
      data,
      this.getOptions()
    );
  }

  //add token to req header

  getOptions() {
    // To fetch token
    const token = JSON.parse(localStorage.getItem('token') || '');

    //create http header
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.append('x-access-token', token);
      options.headers = headers;
    }
    return options;
  }

  // widraw

  widraw(acnoWidraw: any, password: any, amt: any) {
    //req body
    const data = {
      amt,
      acnoWidraw,
      password,
    };

    // widraw API
    return this.http.post(
      'http://localhost:3000/widraw',
      data,
      this.getOptions()
    );

    // var amount = parseInt(amt);
    // let database = this.database;

    // if (acnoWidraw in database) {
    //   if (password == database[acnoWidraw]['password']) {
    //     if (database[acnoWidraw]['balance'] >= amount) {
    //       database[acnoWidraw]['balance'] -= amount;
    //       database[acnoWidraw]['transaction'].push({
    //         type: 'DEBIT',
    //         amount: amount,
    //       });
    //       this.saveDetails();

    //       return database[acnoWidraw]['balance'];
    //     } else {
    //       alert('insufficient balance');
    //       return false;
    //     }
    //   } else {
    //     alert('invalid password');
    //     return false;
    //   }
    // } else {
    //   alert('Account number does not exist');
    //   return false;
    // }
  }

  //transaction

  transaction(acno: any) {
    const data = {
      acno
    };
      // transaction API
    return this.http.post(
      'http://localhost:3000/transaction',
      data,
      this.getOptions()
    );

    // return this.database[acno].transaction;
  }

  // logout


  onDashDelete(acno:any){
    return this.http.delete(
      'http://localhost:3000/onDashDelete/'+acno,
      this.getOptions()
    );
  }
}

