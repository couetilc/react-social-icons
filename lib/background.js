var React = require('react');

var networks = require('./networks');

module.exports = React.createClass({
  displayName: 'Background',

  render() {
    return (
      <g className="svg-background">
        <circle cx="32" cy="32" r="31"/>
      </g>
    );
  }
});
