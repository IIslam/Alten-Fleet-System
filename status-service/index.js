"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const _ = require("lodash");

const cars = {
  ABC123: {
    regNo: "ABC123",
    vin: "YS2R4X20005399401",
    lastPing: moment()
  },
  DEF456: {
    regNo: "DEF456",
    vin: "VLUR4X20009093588",
    lastPing: moment()
  },
  GHI789: {
    regNo: "GHI789",
    vin: "VLUR4X20009048066",
    lastPing: moment()
  },
  JKL012: {
    regNo: "JKL012",
    vin: "YS2R4X20005388011",
    lastPing: moment()
  },
  MNO345: {
    regNo: "MNO345",
    vin: "YS2R4X20005387949",
    lastPing: moment()
  },
  PQR678: {
    regNo: "PQR678",
    vin: "VLUR4X20009048066",
    lastPing: moment()
  },
  STU901: {
    regNo: "STU901",
    vin: "YS2R4X20005387055",
    lastPing: moment()
  }
};

const port = normalizePort(process.env.PORT || "8001");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());

app.get("/connect/:regNo", (req, res) => {
  let regNo = req.params.regNo;
  cars[regNo].lastPing = moment();
  res.status(200).send({ status: "connected" });
});

app.get("/connected", (req, res) => {
  let connectCarsVin = _.map(
    _.filter(cars, car => checkStatus(car.lastPing)),
    item => item.regNo
  );
  res.status(200).send(connectCarsVin);
});

console.log(`Threats service listening on port ${port}.`);
app.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function checkStatus(lastPing) {
  return moment.duration(moment().diff(lastPing)).asMinutes() <= 1;
}
