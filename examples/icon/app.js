import React from 'react';
import ReactDOM from 'react-dom';
import * as networks from '../../src/networks';
import SocialIcon from '../../src/social-icon';
import SocialIcons from '../../src/social-icons';

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
    <SocialIcon network="pinterest" style={{ height: 25, width: 25 }} />
    <SocialIcon network="pinterest" style={{ height: 50, width: 50 }} />
    <SocialIcon network="pinterest" style={{ height: 100, width: 100 }} />
    <SocialIcon network="pinterest" style={{ height: 200, width: 200 }} />
  </div>
);

ReactDOM.render(lib, document.getElementById('lib'));
ReactDOM.render(networkExample, document.getElementById('network-example'));
ReactDOM.render(urlExample, document.getElementById('url-example'));
ReactDOM.render(colorExample, document.getElementById('color-example'));
ReactDOM.render(iconsExample, document.getElementById('icons-example'));
ReactDOM.render(iconsColorExample, document.getElementById('icons-color-example'));
ReactDOM.render(sizes, document.getElementById('sizes'));
