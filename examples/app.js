import React from 'react'
import ReactDOM from 'react-dom'

import * as networks from '../src/networks.js'
// import { SocialIcon } from '../src/react-social-icons.js'
import '../src/all';
// import '../src/icons/behance';
import SocialIcon from '../src/component';
console.log({ keys: networks.KEYS });

function Page() {
  return (
    <>
      <h1>
        <a href="https://github.com/jaketrent/react-social-icons">react-social-icons</a>
      </h1>
      <p>
        A set of beautiful svg social icons.  Easily used in React.  No images or
        external css dependencies.
      </p>

      <h2>Library</h2>
      <p>Here are the available icons.</p>
      <div id="lib">
        {networks.KEYS.map(k => <SocialIcon network={k} title={k} key={k} />)}
      </div>

      <h2>Usage</h2>

      <h4>Detect URL</h4>
      <p>
        By default, pass the <code>url</code> of your social network, and the
        icon will be detected from the url.
      </p>
      <div className="one-line-example">
        <div className="icon" id="url-example">
          <SocialIcon url="https://linkedin.com/in/jaketrent" />
        </div>
        <code className="code">
          <pre>{`<SocialIcon url="https://linkedin.com/in/jaketrent" />`}</pre>
        </code>
      </div>

      <h4>Specify Network</h4>
      <p>
        If you have a need to specify the network, you can.  If you don't
        specify a url, your <code>href</code> attribute will be omitted.  You
        can include props for both <code>url</code> and <code>network</code>.
        The <code>network</code> prop takes precedence.
      </p>
      <div className="one-line-example">
        <div className="icon" id="network-example">
          <SocialIcon network="tumblr" url="https://jaketrent.com" />
        </div>
        <code className="code">
          <pre>{`<SocialIcon url="https://jaketrent.com" network="tumblr" />`}</pre>
        </code>
      </div>

      <h4>Specify the Color</h4>
      <p>
        You can override the background fill color associated with the network
        with the <code>bgColor</code> prop.
      </p>
      <div className="one-line-example">
        <div className="icon" id="bg-color-example">
          <SocialIcon network="twitter" bgColor="#ff5a01" />
        </div>
        <code className="code">
          <pre>{`<SocialIcon network="twitter" bgColor="#ff5a01" />`}</pre>
        </code>
      </div>

      <p>
        You can fill the usually-transparent icon color with the&nbsp;
        <code>fgColor</code> prop.
      </p>
      <div className="one-line-example">
        <div className="icon" id="fg-color-example">
          <SocialIcon network="twitter" fgColor="#ff5a01" />
        </div>
        <code className="code">
          <pre>{`<SocialIcon network="twitter" fgColor="#ff5a01" />`}</pre>
        </code>
      </div>

      <h4>Specify the Label</h4>
      <p>
        By default, the <code>SocialIcon</code> will use the name of a social
        network as an icon's accessible label. If you think the social
        network name is not enough context, you can pass in the <code>label</code>
        &nbsp;prop.
      </p>
      <div className="one-line-example">
        <div className="icon" id="label-example">
          <SocialIcon url="https://www.example.com" label="Our portfolio" />
        </div>
        <code className="code">
          <pre>{`<SocialIcon url="https://www.example.com" label="Our portfolio" />`}</pre>
        </code>
      </div>

      <h4>Render</h4>
      <p>The full code required to render.</p>
      <code className="code">
        <pre>{
`var React = require('react');
var { SocialIcon } = require('react-social-icons');
React.render(<SocialIcon url="https://linkedin.com/in/jaketrent" />, document.body);`
        }</pre>
      </code>

      <h2>It scales!</h2>
      <p>Witness the beautiful SVG in action.</p>
      <p>
        <i>Note:</i> this library injects on-page <code>style</code> tags into
        the <code>head</code>.  This is great because you don't have to
        import any additional stylesheet to support this library.  But more
        specificity in selectors will be required when overriding default
        styles from external stylesheets.
      </p>
      <div id="sizes">
        <SocialIcon network="pinterest" style={{ height: 25, width: 25 }} key="25" />
        <SocialIcon network="pinterest" style={{ height: 50, width: 50 }} key="50" />
        <SocialIcon network="pinterest" style={{ height: 100, width: 100 }} key="100" />
        <SocialIcon network="pinterest" style={{ height: 200, width: 200 }} key="200" /> 
      </div>

      <code>
        <pre>{
`<SocialIcon network="pinterest" style={{ height: 25, width: 25 }} />
<SocialIcon network="pinterest" style={{ height: 50, width: 50 }} />
<SocialIcon network="pinterest" style={{ height: 100, width: 100 }} />
<SocialIcon network="pinterest" style={{ height: 200, width: 200 }} />`
        }</pre>
      </code>

      <h2>Feedback</h2>
      <p>
        If you're interested in adding additional networks or helping make the
        library better, <a href="https://github.com/jaketrent/react-social-icons">
        fork it on github</a> and let the code fly!
      </p>

      <footer className="footer">
        <p>
          <a href="https://github.com/jaketrent/react-social-icons/blob/master/LICENSE.md">
            MIT Licensed
          </a>
          &nbsp;- from&nbsp;
          <a href="https://jaketrent.com">Jake Trent</a>
        </p>
      </footer>
    </>
  );
}

ReactDOM.render(<Page />, document.getElementById('page'));
