const classnames = require('classnames');
const React = require('react');

const Background = require('./background');
const Icon = require('./icon');
const Mask = require('./mask');
const networks = require('./networks');

require('./social-icon.scss');

// TODO: add PureRenderMixin
module.exports = React.createClass({
  displayName: 'SocialIcon',

  propTypes: {
    className: React.PropTypes.string,
    color: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.bool),
    network: React.PropTypes.string,
    url: React.PropTypes.string.isRequired
  },

  getNetworkKey() {
    return this.props.network || networks.keyFor(this.props.url);
  },

  getClassName() {
    return classnames('social-icon', this.props.className);
  },

  render() {
    return (
      <a ref="link" href={this.props.url} target="_blank" className={this.getClassName()}>
        <div className="social-container">
          <svg className="social-svg" viewBox="0 0 64 64">
            <Background ref="background" />
            <Icon ref="icon" networkKey={this.getNetworkKey()} />
            <Mask ref="mask" networkKey={this.getNetworkKey()} color={this.props.color} />
          </svg>
        </div>
      </a>
    );
  }
});