
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


console.log('Booting up our components!!');

var React = require('react');

var Navbar = require('./components/navbar');
var Rx = require('Rx');

var RxFire = require('../../../lib/rx-fire');

React.render(<Navbar></Navbar>, document.body);

var mouseMove = Rx.Observable.fromEvent(document, 'mousemove');

mouseMove
  .map(function(ev) {
    return {
      x: ev.clientX,
      y: ev.clientY
    };
  })
  .pairwise(2)
  .map(function(polls) {
    var pos1 = polls[0];
    var pos2 = polls[1];
    return {
      x: pos2.x - pos1.x,
      y: pos2.y - pos1.y
    }
  })
  .subscribe(function(ev) {
    console.log(ev.x, ev.y)
  }, function(err) {
    console.log(err);
  });




