var React = require('react');

var networks = require('./networks');

module.exports = React.createClass({
  displayName: 'Mask',

  propTypes: {
    networkKey: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <g className="social-mask">
        <path d={networks.maskFor(this.props.networkKey)} />
      </g>
    );
  }
});
