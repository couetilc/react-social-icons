const React = require('react');

const SocialIcon = require('./social-icon');

module.exports = React.createClass({
  displayName: 'SocialIcons',

  propTypes: {
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    urls: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps() {
    return {
      urls: []
    }
  },

  renderIcons() {
    return this.props.urls.map((url, i) => {
      return (
        <SocialIcon key={i} url={url} color={this.props.color} className={this.props.className} />
      );
    });
  },

  render() {
    return (
      <div>
        {this.renderIcons()}
      </div>
    );
  }
});