var React = require('react');

const Background = require('./background');
const Icon = require('./icon');
const Mask = require('./mask');
var networks = require('./networks');

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