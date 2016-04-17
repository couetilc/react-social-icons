#!/bin/bash

RELEASE_DIR=${RELEASE_DIR:-lib}
PACKAGE_VERSION=$(cat package.json | ./node_modules/.bin/json version)
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

echo "Creating v$PACKAGE_VERSION release in $RELEASE_DIR, current branch is '$BRANCH_NAME'"

npm run prepublish
git branch -D build
git checkout --orphan build
find . -mindepth 1 -maxdepth 1 ! -name ".git" ! -name ".gitignore" ! -name $RELEASE_DIR ! -name "README.md" ! -name "LICENSE.md" ! -name "node_modules" ! -name "package.json" -exec rm -r "{}" \;
cp -r $RELEASE_DIR/* .
rm -rf $RELEASE_DIR
git add .
git commit -m "Release v$PACKAGE_VERSION"
git tag -a v$PACKAGE_VERSION -m "Release v$PACKAGE_VERSION"
git push origin v$PACKAGE_VERSION
git checkout $BRANCH_NAME
npm run prepublish
