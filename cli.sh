#!/usr/bin/env bash

generate-icons() {
  node --input-type=module -e "
  import { generateSocialIcons } from './src/generate.js';
  generateSocialIcons();
  "
}

build() {
  generate-icons

  # why do I transpile? can I test my desired outcome?
  pnpm babel src \
    --copy-files \
    --out-dir "./dist" \
    --ignore "src/**/*.{spec,test}.*" \
    --extensions ".ts"
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
