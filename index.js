// server connection

// import express
const express = require("express");

//import cors
const cors = require("cors");

// create server app using express
const app = express();

//use cors
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

//dataservice
const dataService = require("./services/data.service");

// to parse json data
app.use(express.json());

// JsonWebToken import
const jwt = require("jsonwebtoken");

//resolving API call

//GET - to read data
app.get("/", (req, res) => {
  res.send("GET REQUEST");
});

// POST - To create data
app.post("/", (req, res) => {
  res.send("POST REQUEST");
});

// PUT - To UPDATE/MODIFY DATA
app.put("/", (req, res) => {
  res.send("PUT REQUEST");
});

// PATCH - TO PARTIALLY UPDATE DATA
app.patch("/", (req, res) => {
  res.send("PATCH REQUEST");
});

// DELETE - TO DELETE DATA
app.delete("/", (req, res) => {
  res.send("DELETE REQUEST");
});

// jwtMiddleWare
const jwtMiddleWare = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const data = jwt.verify(token, "supersecret123456789");
    console.log(jwt.verify(token, "supersecret123456789"));
    req.reqCurrentAcno = data.currentAcno;
    next();
  } catch {
    res.status(401).json({
      status: false,
      message: "please login",
    });
  }
};

// register api
app.post("/register", (req, res) => {
  dataService
    .register(req.body.uname, req.body.acno, req.body.password)
    // assynchrnous, we can't assign assynchronous datas into constant.
    .then((result) => {
      res.status(result.statuscode).json(result);
    });
});

// login api
app.post("/login", (req, res) => {
  dataService.login(req.body.acno, req.body.pswd).then((result) => {
    res.status(result.statuscode).json(result);
  });
});

// deposit api
app.post("/deposit", jwtMiddleWare, (req, res) => {
  dataService
    .deposit(req.body.acnoDepo, req.body.password, req.body.amt)
    .then((result) => {
      res.status(result.statuscode).json(result);
    });
});

// widraw api
app.post("/widraw", jwtMiddleWare, (req, res) => {
  dataService
    .widraw(
      //here the extra request is for getting reqCurrentAcno
      req,
      req.body.acnoWidraw,
      req.body.password,
      req.body.amt
    )
    .then((result) => {
      res.status(result.statuscode).json(result);
    });
});

//Transaction API - router specific middleware: jwtMiddleware
app.post("/transaction", jwtMiddleWare, (req, res) => {
  dataService.transaction(req.body.acno).then((result) => {
    res.status(result.statuscode).json(result);
  });
});

// onDashDelete API
app.delete("/onDashDelete/:acno",jwtMiddleWare,(req,res)=>{
  dataService.onDashDelete(req.params.acno)
  .then((result) => {
    res.status(result.statuscode).json(result);
  });
})
// set port number
app.listen(3000, () => {
  console.log("server started at 3000");
});
