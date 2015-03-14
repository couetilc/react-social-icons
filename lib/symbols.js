var React = require('react');

var networks = require('./networks');

module.exports = React.createClass({
  propTypes: {
    networks: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  renderSymbols() {
    return this.props.networks.map((key) => {
      return [
        <symbol id={`${key}-icon`} viewBox="0 0 64 64">
          <g className="social-icon">
            <path d={networks.iconFor(key)} />
          </g>
        </symbol>,
        <symbol id={`${key}-mask`} viewBox="0 0 64 64">
        <g className="social-mask">
          <path d={networks.maskFor(key)} />
        </g>
        </symbol>
      ];
    });
  },

  renderBackgroundSymbol() {
    return (
      <symbol id="background" viewBox="0 0 64 64">
        <g className="social-background">
          <circle cx="32" cy="32" r="31"/>
        </g>
      </symbol>
    );
  },

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" id="social-symbols" version="1.1">
        {this.renderBackgroundSymbol()}
        {this.renderSymbols()}
      </svg>
    );
  }
})