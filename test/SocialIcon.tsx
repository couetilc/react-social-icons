import React from 'react';
import { SocialIcon } from '../src/react-social-icons.js'
const SocialIconTest = () => (
  <>
    <SocialIcon
      url="https//example.com"
      bgColor="#000000"
      fgColor="#ffffff"
      label="social icon"
      network="example"
      defaultSVG={{ icon: "", mask: "", color: "" }}
      style={{ height: '100px', width: '100px' }}
    />
    <SocialIcon
      // @ts-expect-error
      url={null}
      // @ts-expect-error
      bgColor={null}
      // @ts-expect-error
      fgColor={null}
      // @ts-expect-error
      label={null}
      // @ts-expect-error
      network={null}
      // @ts-expect-error
      defaultSVG={{ icon: "" }}
      // @ts-expect-error
      style={null}
    />
    <SocialIcon><div></div></SocialIcon>
  </>
);
export default SocialIconTest;
