var Rx = require('rx');
var Firebase = require('firebase')
var _ = require('lodash');
var util = require('util');

var Cursor = function(listeners, ref) {
  this.listeners = listeners;
  this.ref = ref;
};

_.each([
  'child', 'parent', 'key', 'name', 'toString', 'set',
  'update', 'remove', 'push', 'transaction', 'setPriority',
  'setWithPriority'


], function(method) {
  Cursor.prototype[method] = function() {
    return new Cursor(this.listeners, this.ref[method].apply(this.ref, arguments));
  }
});

Cursor.on = function(event) {
  var self = this;
  return Rx.Observable.create(function(observer) {
    self.listeners[event] = self.ref.on(event, function(snapshot) {
      observer.next(snapshot);
    });
  });
};

Cursor.off = function(event) {

};



var RxFire = function(options) {
  this.fireUrl = options.url;
  this.ref = new Firebase(this.fireUrl);
  this.listeners = {};
  this.root = new Cursor(this.listeners, this.firebase.root());
};

util.inherits(RxFire, Cursor);






module.exports = RxFire;











