#!/bin/sh

# first, git rebase master

node_modules/.bin/webpack --content-base examples/
cp examples/index.html index.html
cp examples/__build__/* site/
cp examples/icon/*.css site/

sed -i '' -- 's/__build__/site/g' index.html
sed -i '' -- 's/icon\//site\//g' index.html

git add index.html site/
git commit -m "gen gh-pages from examples"