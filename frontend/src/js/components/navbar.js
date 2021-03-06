var React = require('React');
var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var FontIcon = mui.FontIcon;
var RaisedButton = mui.RaisedButton;
var DropDownIcon = mui.DropDownIcon;
var DropDownMenu = mui.DropDownMenu;


var filterOptions = [
  { payload: '1', text: 'All Broadcasts' },
  { payload: '2', text: 'All Voice' },
  { payload: '3', text: 'All Text' },
  { payload: '4', text: 'Complete Voice' },
  { payload: '5', text: 'Complete Text' },
  { payload: '6', text: 'Active Voice' },
  { payload: '7', text: 'Active Text' },
];
var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];




var Navbar = React.createClass({
  render: function() {
    return <Toolbar>
      <ToolbarGroup key={0} float="left">
        <DropDownMenu menuItems={filterOptions} />
      </ToolbarGroup>
      <ToolbarGroup key={1} float="right">
        <FontIcon className="mui-icon-pie" />
        <FontIcon className="mui-icon-sort" />
        <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
        <span className="mui-toolbar-separator">&nbsp;</span>
        <RaisedButton label="Create Broadcast" primary={true} />
      </ToolbarGroup>
    </Toolbar>
  }
});

module.exports = Navbar;





