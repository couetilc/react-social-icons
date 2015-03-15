var React = require('react');

module.exports = React.createClass({
  displayName: 'Background',

  render() {
    return (
      <g className="social-svg-background">
        <circle cx="32" cy="32" r="31"/>
      </g>
    );
  }
});
