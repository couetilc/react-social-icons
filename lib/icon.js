var React = require('react');

var networks = require('./networks');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    networkKey: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <g {...this.props} className="social-svg-icon">
        <path d={networks.iconFor(this.props.networkKey)} />
      </g>
    );
  }
});
