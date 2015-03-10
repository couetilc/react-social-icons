var React = require('react');

var networks = require('./networks');

var Background = React.createClass({
  displayName: 'Background',

  render() {
    return (
      <g className="svg-background">
        <circle cx="32" cy="32" r="31"/>
      </g>
    );
  }
});

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    networkKey: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <g className="svg-icon">
        <path d={networks.iconFor(this.props.networkKey)}/>
      </g>
    );
  }
});

var Mask = React.createClass({
  displayName: 'Mask',

  propTypes: {
    networkKey: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <g className="svg-mask">
        <path d={networks.maskFor(this.props.networkKey)}/>
      </g>
    );
  }
});

module.exports = React.createClass({
  displayName: 'SocialIcon',

  propTypes: {
    network: React.PropTypes.string,
    url: React.PropTypes.string.isRequired
  },

  getNetworkKey() {
    return this.props.network || networks.keyFor(this.props.url);
  },

  render() {
    return (
      <a ref="link" href={this.props.url} target="_blank" className="social-icon TODOinstagram">
        <div className="social-container">
          <svg className="social-svg" viewBox="0 0 64 64">
            <Background />
            <Icon ref="icon" networkKey={this.getNetworkKey()} />
            <Mask ref="mask" networkKey={this.getNetworkKey()} />
          </svg>
        </div>
      </a>
    );
  }
});