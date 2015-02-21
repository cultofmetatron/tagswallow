
var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


console.log('Booting up our components!!');

var React = require('react');

var Navbar = require('./components/navbar');

React.render(<Navbar></Navbar>, document.body);




