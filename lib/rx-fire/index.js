var Rx = require('rx');
var Firebase = require('firebase')
var _ = require('lodash');
var util = require('util');

var Cursor = function(listeners, ref) {
  this.listeners = listeners;
  this.ref = ref;
};

_.each([
  'child', 'parent', 'key', 'name', 'toString',
  'transaction', 'root', 'orderByChild', 'orderByValue',
  'orderByKey', 'orderByPriority', 'startAt', 'endAt', 
  'equalTo', 'limitToFirst', 'limitToLast', 'limit', 'ref'


], function(method) {
  Cursor.prototype[method] = function() {
    return new Cursor(this.listeners, this.ref[method].apply(this.ref, arguments));
  };
});

Cursor.prototype.on = function(event) {
  var self = this;
  if (this.listeners[event]) {
    return this.listeners[event].observable;
  } else {
    var observable = Rx.Observable.create(function(observer) {
      var handler = function(snapshot) {
        observer.onNext(snapshot);
      };
      self.ref.on(event, handler);
      self.listeners[event] = {
        handler: handler,
        observer: observer
      }
    });
    self.listeners[event].observable = observable;
    return observable;
  }
};

/* event handling */

//self is a object value which is passed by reference so all derived cursors 
//should share the same set of listeners
Cursor.prototype.off = function(event) {
  var self = this;
  if (this.listeners[event]) {
    this.ref.off(event, this.listeners[event].handler )
    this.listeners[event].observer.onCompleted();
    delete this.listeners[event];
  };
  return this;
};

Cursor.prototype.once = function(event) {
  var self = this;
  return Rx.Observable.create(function(observer) {
    self.ref.once(event, function(snapshot) {
      observer.onNext(snapshot);
      observer.onCompleted();
    });
  });
};


/* Async atomic changes */

_.each(
  [
    'set', 'push', 'update', 'remove',
    'setPriority', 'setWithPriority'
  ],
  function(method) {
    Cursor.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments);
      var self = this;
      return Rx.Observable.create(function(observer) {
        self.ref[method].apply(self.ref, args.concat([function(err) {
          if (err) {
            observer.onError(err);
          } else {
            observer.onNext(self);
          }
          observer.onCompleted();

        }]));
      });
    };
})




var RxFire = function(url) {
  this.ref = new Firebase(url);
  this.listeners = {};
  this.root = new Cursor(this.listeners, this.ref);
};

util.inherits(RxFire, Cursor);






module.exports = RxFire;











