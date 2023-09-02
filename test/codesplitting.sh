#!/usr/bin/env bash

mkdir .codesplitting

cat > .codesplitting/full.js <<- EOM
import { SocialIcon } from '../dist/react-social-icons.js'
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(React.createElement(SocialIcon, document.body))
EOM

cat > .codesplitting/split.js <<- EOM
import { SocialIcon } from '../dist/component.js'
import '../dist/icons/pinterest.js'
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(React.createElement(SocialIcon, document.body))
EOM

pnpm rollup \
  --silent \
  --input .codesplitting/full.js \
  --format es \
| gzip > .codesplitting/full.gz

pnpm rollup \
  --silent \
  --input .codesplitting/split.js \
  --format es \
| gzip > .codesplitting/split.gz

full_size="$(stat -n -f "%z" .codesplitting/full.gz)"
split_size="$(stat -n -f "%z" .codesplitting/split.gz)"

echo "full_size: $full_size"
echo "split_size: $split_size"

rm .codesplitting/split.*
rm .codesplitting/full.*
rmdir .codesplitting

if [ "$split_size" -ge "$full_size" ]; then
  echo "Failed codesplitting test"
  exit 1
fi

echo "Passed codesplitting test"
