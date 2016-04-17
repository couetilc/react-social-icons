import React from 'react';
import ReactDOM from 'react-dom';
import * as networks from '../../lib/networks';
import SocialIcon from '../../lib/social-icon';
import SocialIcons from '../../lib/social-icons';

const lib = (
  <div>
    {networks.KEYS.map((k) => (<SocialIcon network={k} title={k} key={k} />))}
  </div>
);

const urlExample = (
  <SocialIcon url="http://linkedin.com/in/jaketrent" />
);

const networkExample = (
  <SocialIcon network="tumblr" url="http://jaketrent.com" />
);

const colorExample = (
  <SocialIcon network="twitter" color="#ff5a01" />
);

const urls = [
  'http://jaketrent.com',
  'http://twitter.com/jaketrent',
  'http://linkedin.com/in/jaketrent',
  'https://www.pinterest.com/jaketrent/artsy-fartsy/',
];

const iconsExample = (
  <SocialIcons urls={urls} className="med" />
);

const iconsColorExample = (
  <SocialIcons urls={urls} color="black" className="sm" />
);

const sizes = (
  <div>
    <SocialIcon network="pinterest" className="sm" />
    <SocialIcon network="pinterest" className="med" />
    <SocialIcon network="pinterest" className="lrg" />
    <SocialIcon network="pinterest" className="xlrg" />
  </div>
);

ReactDOM.render(lib, document.getElementById('lib'));
ReactDOM.render(networkExample, document.getElementById('network-example'));
ReactDOM.render(urlExample, document.getElementById('url-example'));
ReactDOM.render(colorExample, document.getElementById('color-example'));
ReactDOM.render(iconsExample, document.getElementById('icons-example'));
ReactDOM.render(iconsColorExample, document.getElementById('icons-color-example'));
ReactDOM.render(sizes, document.getElementById('sizes'));
