var React = require('react');

var networks = require('../../lib/networks');
var SocialIcon = require('../../lib/social-icon');
var SocialIcons = require('../../lib/social-icons');

var lib = (
  <div>
    {networks.KEYS.map((k) => { return <SocialIcon network={k} title={k} key={k} />; })}
  </div>
);

var urlExample = (
  <SocialIcon url="http://linkedin.com/in/jaketrent" />
);

var networkExample = (
  <SocialIcon network="tumblr" url="http://jaketrent.com" />
);

var colorExample = (
  <SocialIcon network="twitter" color="#ff5a01" />
);

var urls = [
  'http://jaketrent.com',
  'http://twitter.com/jaketrent',
  'http://linkedin.com/in/jaketrent',
  'https://www.pinterest.com/jaketrent/artsy-fartsy/'
]

var iconsExample = (
  <SocialIcons urls={urls} className="med" />
);

var iconsColorExample = (
  <SocialIcons urls={urls} color="black" className="sm" />
);

var sizes = (
  <div>
    <SocialIcon network="pinterest" className="sm" />
    <SocialIcon network="pinterest" className="med" />
    <SocialIcon network="pinterest" className="lrg" />
    <SocialIcon network="pinterest" className="xlrg" />
  </div>
);

React.render(lib, document.getElementById('lib'));
React.render(networkExample, document.getElementById('network-example'));
React.render(urlExample, document.getElementById('url-example'));
React.render(colorExample, document.getElementById('color-example'));
React.render(iconsExample, document.getElementById('icons-example'));
React.render(iconsColorExample, document.getElementById('icons-color-example'));
React.render(sizes, document.getElementById('sizes'));
