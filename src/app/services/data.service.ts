import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //database
  database: any = {
    1000: { acno: 1000, uname: 'raeez', password: 1000, balance: 50000 },
    1001: { acno: 1001, uname: 'florie', password: 1001, balance: 10000 },
    1002: { acno: 1002, uname: 'Vyom', password: 1002, balance: 5000 },
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
}
