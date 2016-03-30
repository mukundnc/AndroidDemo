'use strict';

/**
 * Module dependencies.
 */

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Store = function () {
  this.sessions = {};
  EventEmitter.call(this);
};

util.inherits(Store, EventEmitter);

Store.prototype.get = function *(sid) {
  var session = this.sessions[sid];
  if (!session) {
    return null;
  }
  var r = {};
  for (var key in session) {
    r[key] = session[key];
  }
  return r;
};

Store.prototype.set = function *(sid, val) {
  this.sessions[sid] = val;
};

Store.prototype.destroy = function *(sid) {
  delete this.sessions[sid];
};

module.exports = new Store();