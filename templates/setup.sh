#!/bin/bash

setup_git_hooks() {
  chmod u+x ./scripts/commit-msg
  ln -s ../../scripts/commit-msg .git/hooks/commit-msg
}

setup_git_hooks

