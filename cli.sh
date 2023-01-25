#!/usr/bin/env bash

build() {
  # why do I transpile? can I test my desired outcome?
  pnpm rollup -c rollup.config.js
}

dev() {
  pnpm vite
}

test:js() {
  pnpm playwright test \
    -c playwright-ct.config.ts
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
