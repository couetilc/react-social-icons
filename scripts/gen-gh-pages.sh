#!/bin/sh

# first, git rebase master

node_modules/.bin/webpack --content-base examples/
cp examples/index.html index.html
sed -i '' -- 's/__build__/examples\/__build__/g' index.html
sed -i '' -- 's/icon\//examples\/icon\//g' index.html
git add examples/__build__ index.html
git commit -m "gen gh-pages from examples"