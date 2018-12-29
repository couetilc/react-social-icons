#!/bin/sh

# first, git rebase/merge master

npm install

parcel build examples/index.html

git rm app.*
rm app.*
cp dist/* .

git add .
git commit -m "gen gh-pages from examples"
