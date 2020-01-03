"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const _ = require("lodash");
const request = require("request");

const cars = {
  ABC123: {
    vin: "YS2R4X20005399401",
    registration: "ABC123",
    customerSlug: "kalles-grustransporter-ab",
    custumerName: "Kalles Grustransporter AB"
  },
  DEF456: {
    vin: "VLUR4X20009093588",
    registration: "DEF456",
    customerSlug: "kalles-grustransporter-ab",
    custumerName: "Kalles Grustransporter AB"
  },
  GHI789: {
    vin: "VLUR4X20009048066",
    registration: "GHI789",
    customerSlug: "kalles-grustransporter-ab",
    custumerName: "Kalles Grustransporter AB"
  },
  JKL012: {
    vin: "YS2R4X20005388011",
    registration: "JKL012",
    customerSlug: "johans-bulk-ab",
    custumerName: "Johans Bulk AB"
  },
  MNO345: {
    vin: "YS2R4X20005387949",
    registration: "MNO345",
    customerSlug: "johans-bulk-ab",
    custumerName: "Johans Bulk AB"
  },
  PQR678: {
    vin: "VLUR4X20009048066",
    registration: "PQR678",
    customerSlug: "haralds-värdetransporter-ab",
    custumerName: "Haralds Värdetransporter AB"
  },
  STU901: {
    vin: "YS2R4X20005387055",
    registration: "STU901",
    customerSlug: "haralds-värdetransporter-ab",
    custumerName: "Haralds Värdetransporter AB"
  }
};

const port = normalizePort(process.env.PORT || "3002");
const statusServiceURI = process.env.STATUS_SERVICE || "http://localhost:3001";
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());

app.get("/cars", (req, res) => {
  request.get(
    `${statusServiceURI}/connected`,
    {
      headers: { "content-type": "application/json" }
    },
    (err, StatusRes, body) => {
      let connectedCars = JSON.parse(body);
      let carsWithStatus = _.map(cars, car => {
        if (_.includes(connectedCars, car.registration)) {
          car.status = "connected";
        } else {
          car.status = "not-connected";
        }
        return car;
      });
      res.status(200).send(Object.values(_.filter(carsWithStatus, req.query)));
    }
  );
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
