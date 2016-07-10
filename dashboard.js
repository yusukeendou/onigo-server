var express = require("express");
var io = require("socket.io");
var EventEmitter = require("events").EventEmitter;
var util = require("util");

var instance = null;

function Dashboard(port) {
  EventEmitter.call(this);

  if (instance !== null) {
    return instance;
  }

  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);

  app.use(express.static("dashboard"));
  server.listen(port, () => {
    console.log("dashboard listening on port " + port);
  });

  io.on('connection', socket => {
    console.log("a user connected.");
    socket.on("gameState", data => {
      if (/active|inactive/.test(data.gameState)) {
        this.emit("gameState", data.gameState);
      }
    });
  });

  instance = this;
  return this;
}

util.inherits(Dashboard, EventEmitter);

module.exports = Dashboard;

