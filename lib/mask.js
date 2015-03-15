const React = require('react');

const networks = require('./networks');

module.exports = React.createClass({
  displayName: 'Mask',

  propTypes: {
    color: React.PropTypes.string,
    networkKey: React.PropTypes.string.isRequired
  },

  getStyle() {
    return {
      fill: this.props.color || networks.colorFor(this.props.networkKey)
    };
  },

  render() {
    return (
      <g {...this.props} className="social-svg-mask" style={this.getStyle()}>
        <path d={networks.maskFor(this.props.networkKey)} />
      </g>
    );
  }
});
