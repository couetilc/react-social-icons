#!/usr/bin/env bash

build() {
  # why do I transpile? can I test my desired outcome?
  pnpm rollup -c rollup.config.js
}

dev() {
  pnpm vite
}

test:js() {
  test:js-src
  test:js-dist
}

test:js-src() {
  pnpm playwright test \
    -c test/browsers/playwright-ct-src.config.js
}

test:js-dist() {
  pnpm playwright test \
    -c test/browsers/playwright-ct-dist.config.js
}

test:lint() {
  pnpm eslint .eslintrc.cjs .
}

test:publint() {
  pnpm publint .
}

test:ts() {
  pnpm tsc
}

info:bundlesize() {
 build
 tar -c dist | gzip > dist.tar.gz
 du -h dist dist.tar.gz
}

test:() {
  test:js;
  test:lint;
  test:publint;
  test:ts;
}

"$@"
