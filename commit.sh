#!/bin/bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git commit $@ &&
git symbolic-ref HEAD refs/heads/build &&
git reset && git checkout .gitignore &&
npm run build &&
git add -A &&
git commit --allow-empty -am 'build '$(git log develop --pretty=format:'%H' -n 1) &&
git checkout $CURRENT_BRANCH
