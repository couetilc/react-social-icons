/* eslint-env node */
import { SocialIcon } from "../../dist/react-social-icons.js";
import { renderToString, renderToPipeableStream  } from "react-dom/server";
import { createElement as c} from "react";
import express from "express";
import fs from "fs";

const port = Number(process.argv[2]) || 0; // use port from CLI else random port
const app = express();
const appCss = fs.readFileSync(
  new URL("../../dist/styles.css", import.meta.url)
);

function Shell(props) {
  return c("html", null,
    c("head", null,
      c("meta", { charSet: "utf-8" }),
      c("link", { rel: "stylesheet", href: "./app.css" })
    ),
    c("body", null,
      props.children
    ),
  );
}

app.get("/", (req, res) => { // to check if server is up
  res.end();
});

app.get("/app.css", (req, res) => {
  res.setHeader("content-type", "text/css");
  res.send(appCss);
});

app.get("/render-to-string", (req, res) => {
  res.send(
    renderToString(
      c(Shell, null,
        c(SocialIcon, { network: "pinterest" })
      )
    )
  );
});

app.get("/render-to-pipeable-stream", (req, res) => {
  const { pipe } = renderToPipeableStream(
    c(Shell, null,
      c(SocialIcon, { network: "pinterest" })
    ),
    {
      onShellReady() {
        res.setHeader("content-type", "text/html");
        pipe(res);
      }
    }
  );
});

app.listen(port);
