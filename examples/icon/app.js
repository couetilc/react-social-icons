var React = require('react');

var SocialIcon = require('../../lib/social-icon');

var separateIcons = (
  <SocialIcon url={"http://pinterest.com/jake"} />
);

React.render(separateIcons, document.getElementById('icon'));
