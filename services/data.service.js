// JsonWebToken import
const jwt = require("jsonwebtoken");

//import db
const db = require("./db");

//database
database = {
  1000: {
    acno: 1000,
    uname: "raeez",
    password: 1000,
    balance: 100,
    transaction: [],
  },
  1001: {
    acno: 1001,
    uname: "florie",
    password: 1001,
    balance: 150,
    transaction: [],
  },
  1002: {
    acno: 1002,
    uname: "Vyom",
    password: 1002,
    balance: 200,
    transaction: [],
  },
};
7;
// register(unam,acn,password)
const register = (uname, acno, password) => {
  //asynchronous
  return db.User.findOne({ acno }).then((user) => {
    console.log(user);
    if (user) {
      // if user already exist
      return {
        statuscode: 401,
        status: false,
        message: "Account number already exist",
      };
    } else {
      // creating object for model that we created in database
      const newUser = new db.User({
        acno,
        uname,
        password,
        balance: 0,
        transaction: [],
      });
      //method to save new user in db ie newUser.save()
      newUser.save();
      return {
        statuscode: 200,
        status: true,
        message: "Sucessfully registered, please login",
      };
    }
  });
  // already exist acno
  // if (acno in database) {
  //   return {
  //     statuscode: 401,
  //     status: false,
  //     message: "Account number already exist",
  //   };
  // } else {
  //   // add details to db
  //   database[acno] = {
  //     acno,
  //     uname,
  //     password,
  //     balance: 0,
  //     transaction: [],
  //   };
  //   console.log(database);
  //   return {
  //     statuscode: 200,
  //     status: true,
  //     message: "Sucessfully registered, please login",
  //   };
  // }
};

// -------------------------------------------------------------------------------------------------------------------------------

// login
const login = (acno, pswd) => {
  // fetch mongodb
  return db.User.findOne({ acno, password: pswd }).then((user) => {
    //check acno in database
    if (user) {
      currentuser = user.uname;
      currentAcno = acno;
      //token generate
      const token = jwt.sign(
        {
          // store acno into currentAcno
          currentAcno: acno,
        },
        "supersecret123456789"
      );

      return {
        statuscode: 200,
        status: true,
        message: "Login successfull",
        token,
        currentAcno,
        currentuser,
      };
    } else {
      return {
        statuscode: 401,
        status: false,
        message: "invalid credentials",
      };
    }
  });

  // // already in database
  // if (acno in database) {
  //   if (pswd == database[acno]["password"]) {
  //     currentuser = database[acno]["uname"];
  //     currentAcno = acno;
  //     //token generate
  //     const token = jwt.sign(
  //       {
  //         // store acno into currentAcno
  //         currentAcno: acno,
  //       },
  //       "supersecret123456789"
  //     );

  //     return {
  //       statuscode: 200,
  //       status: true,
  //       message: "Login successfull",
  //       token,
  //       currentAcno,
  //       currentuser,
  //     };
  //   } else {
  //     return {
  //       statuscode: 422,
  //       status: false,
  //       message: "Incorrect password",
  //     };
  //   }
  // } else {
  //   return {
  //     statuscode: 401,
  //     status: false,
  //     message: "user does not exsist, register first",
  //   };
  // }
};

// -------------------------------------------------------------------------------------------------------------------------------

// Deposit

const deposit = (acnoDepo, password, amt) => {
  var amount = parseInt(amt);
  // fetch mongodb
  return db.User.findOne({ acno: acnoDepo, password }).then((user) => {
    if (user) {
      user.balance += amount;
      user.transaction.push({
        type: "CREDIT",
        amount: amount,
      });
      //method to save this transaction to database
      user.save();
      return {
        statuscode: 200,
        status: true,
        message:
          amount + " suucessfully deposited and new balance is " + user.balance,
      };
    } else {
      return {
        statuscode: 401,
        status: false,
        message: "invalid credentials",
      };
    }
  });

  // if (acnoDepo in database) {
  //   if (password == database[acnoDepo]["password"]) {
  //     database[acnoDepo]["balance"] += amount;
  //     database[acnoDepo]["transaction"].push({
  //       type: "CREDIT",
  //       amount: amount,
  //     });

  //     return {
  //       statuscode: 200,
  //       status: true,
  //       message:
  //         "Amount suucessfully deposited and new balance is" +
  //         database[acnoDepo]["balance"],
  //     };
  //   } else {
  //     return {
  //       statuscode: 401,
  //       status: false,
  //       message: "incorrect password",
  //     };
  //   }
  // } else {
  //   return {
  //     statuscode: 422,
  //     status: false,
  //     message: "Account number does not exist",
  //   };
  // }
};

// -------------------------------------------------------------------------------------------------------------------------------

// widraw

const widraw = (req, acnoWidraw, password, amt) => {
  var amount = parseInt(amt);
  // fetch mongodb
  return db.User.findOne({ acno: acnoWidraw, password }).then((user) => {
    if (req.reqCurrentAcno != acnoWidraw) {
      return {
        statuscode: 401,
        status: false,
        message: "access denied!!"
      };
    }

    if (user) {
      if (user.balance >= amount) {
        user.balance -= amount;
        user.transaction.push({
          type: "DEBIT",
          amount: amount,
        });
      }
      //method to save this transaction to database
      user.save();
      return {
        statuscode: 200,
        status: true,
        message:
          "Amount suucessfully deposited and new balance is" + user.balance,
      };
    } else {
      return {
        statuscode: 422,
        status: false,
        message: "Insufficient balance",
      };
    }
  });

  // if (acnoWidraw in database) {
  //   if (password == database[acnoWidraw]["password"]) {
  //     if (req.reqCurrentAcno != acnoWidraw) {
  //       return {
  //         statuscode: 401,
  //         status: false,
  //         message: "access denied!!",
  //       };
  //     }
  //     if (database[acnoWidraw]["balance"] >= amount) {
  //       database[acnoWidraw]["balance"] -= amount;
  //       database[acnoWidraw]["transaction"].push({
  //         type: "DEBIT",
  //         amount: amount,
  //       });

  //       return {
  //         statuscode: 200,
  //         status: true,
  //         message:
  //           "Amount suucessfully deposited and new balance is" +
  //           database[acnoWidraw]["balance"],
  //       };
  //     } else {
  //       return {
  //         statuscode: 422,
  //         status: false,
  //         message: "Insufficient balance",
  //       };
  //     }
  //   } else {
  //     return {
  //       statuscode: 401,
  //       status: false,
  //       message: "incorrect password",
  //     };
  //   }
  // } else {
  //   return {
  //     statuscode: 422,
  //     status: false,
  //     message: "Account number does not exist",
  //   };
  // }
};

//transaction

const transaction = (acno) => {
  return db.User.findOne({ acno }).then((user) => {
    if (user) {
      return {
        statuscode: 200,
        status: true,
        transaction: user.transaction,
        balance: user.balance,
        acno: user.acno,
      };
    } else
      return {
        statuscode: 422,
        status: false,
        message: "Account number does not exist",
      };
  });
  // if (acno in database) {
  //   return {
  //     statuscode: 200,
  //     status: true,
  //     transaction: database[acno].transaction,
  //   };
  // } else
  //   return {
  //     statuscode: 422,
  //     status: false,
  //     message: "Account number does not exist",
  //   };
};

// -------------------------------------------------------------------------------------------------------------------------------

//onDashDeleted 

const onDashDelete = (acno) => {
  return db.User.deleteOne({ acno }).then((user) => {
    if (!user) {
      return {
        statuscode: 401,
        status: false,
        message: "Operartion failed",
      };
    } else {
      return {
        statuscode: 200,
        status: true,
        message: "Account Number" + acno + "deleted successfully...",
      };
    }
  });
};

//export
module.exports = {
  register,
  login,
  deposit,
  widraw,
  transaction,
  onDashDelete,
};
