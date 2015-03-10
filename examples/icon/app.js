var React = require('react');

var SocialIcon = require('../../lib/social-icon');

var separateIcons = (
  <div className="single-icon">
    <SocialIcon url={"http://pinterest.com/jake"} />
  </div>
);

React.render(separateIcons, document.getElementById('icon'));
