var Rx   = require("rxjs");
var http = require("http");
var util = require("util");

function Server() {
    http.Server.call(this);

    this.requests = Rx.Observable
        .fromEvent(this, "request", function(request, response) {
            return { request: request, response: response };
        });

    this.closes = Rx.Observable
        .fromEvent(this, "close", function() {
            return true;
        });

    this.checkContinues = Rx.Observable
        .fromEvent(this, "checkContinue", function(request, response) {
            return { request: request, response: response };
        });

    this.connects = Rx.Observable
        .fromEvent(this, "connect", function(request, socket, head) {
            return { request: request, socket: socket, head: head };
        });

    this.upgrades = Rx.Observable
        .fromEvent(this, "upgrade", function(request, socket, head) {
            return { request: request, socket: socket, head: head };
        });

    this.clientErrors = Rx.Observable
        .fromEvent(this, "clientError", function(exception, socket) {
            return { exception: exception, socket: socket };
        });
}

util.inherits(Server, http.Server);

module.exports = Server;
