/* eslint-env node */
import { SocialIcon } from "../../dist/react-social-icons.js";
import { renderToString, renderToPipeableStream  } from "react-dom/server";
import { createElement } from "react";
import express from "express";

const port = Number(process.argv[2]) || 0; // use port from CLI else random port
const app = express();

app.get("/", (req, res) => { // to check if server is up
  res.end();
});

app.get("/render-to-string", (req, res) => {
  res.send(
    renderToString(
      createElement(SocialIcon, { network: "pinterest" })
    )
  );
});

app.get("/render-to-pipeable-stream", (req, res) => {
  const { pipe } = renderToPipeableStream(
    createElement(SocialIcon, { network: "pinterest" }),
    {
      onShellReady() {
        res.setHeader("content-type", "text/html");
        pipe(res);
      }
    }
  );
});

app.listen(port);
