import { SocialIcon } from "../../../src/react-social-icons";
import React, { Fragment } from "react";

function TwoDefaultSvg() {
  return (
    <Fragment>
      <SocialIcon data-testid="with-fallback-prop" url="https://example.com" defaultSVG={{
        icon: "test-fallback-icon",
        mask: "test-fallback-mask",
        color: "rgb(0,0,0)",
      }} />
      <SocialIcon data-testid="without-fallback-prop" url="https://example.com" />
    </Fragment>
  );
}

export { TwoDefaultSvg };
