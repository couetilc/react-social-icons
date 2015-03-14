const React = require('react');

const networks = require('./networks');

module.exports = React.createClass({
  displayName: 'Mask',

  propTypes: {
    color: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.bool),
    networkKey: React.PropTypes.string.isRequired
  },

  getStyle() {
    return {
      fill: networks.colorFor(this.props.networkKey)
    };
  },

  render() {
    return (
      <g className="social-mask" style={this.getStyle()}>
        <path d={networks.maskFor(this.props.networkKey)} />
      </g>
    );
  }
});
