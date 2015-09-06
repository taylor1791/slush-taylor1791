#!/bin/sh

AUTHOR_NAME=taylor1791
PROJECT_NAME=temp

setup() {
  cd /tmp
  git clone https://github.com/$AUTHOR_NAME/$PROJECT_NAME
  if [ $? -ne 0 ]; then
    echo "Could not clone test repo"
    exit 1
  fi
  cd $PROJECT_NAME
  echo "\n\n\n" | slush taylor1791
}

clean_up() {
  cd ../
  rm -rf $PROJECT_NAME
}

run_tests() {
  echo "starting tests"
  verify_node_modules
  verify_package
  verify_commit_hooks_installed
  verify_commit_msg_hook
  verify_karma_tests
  verify_coverage
  verify_dist
  verify_autobuild
}

verify_node_modules() {
  if [ ! -d node_modules ]; then
    >&2 echo "Failed to install node_modules"
    exit 1
  fi
}

verify_package() {
  if ! grep -Fq "\"name\": \"$PROJECT_NAME\"" package.json; then
    >&2 echo "Failed to write correct package.json"
    exit 1
  fi
}

verify_commit_hooks_installed() {
  if [ ! -L .git/hooks/commit-msg ]; then
    >&2 echo "Failed to install git hooks"
    exit 1
  fi
}

verify_commit_msg_hook() {
  git add LICENSE
  git commit -m "bad commit" 2> /dev/null
  if [ $? -eq 0 ]; then
    >&2 echo "Did not prevent bad commit message"
    exit 1
  fi
}

verify_karma_tests() {
  karma start --single-run --reporters dots,coverage | grep -q "Executed 2 of 2 SUCCESS"
  if [ ! $? -eq 0 ]; then
    >&2 echo "Did not execute tests successfully"
    exit 1
  fi
}

verify_coverage() {
  cat docs/coverage/PhantomJ*/src/index.js.html | grep -q "Lines.*100%"
  if [ ! $? -eq 0 ]; then
    >&2 echo "Did not execute create cover coverage successfully"
    exit 1
  fi
}

verify_dist() {
  npm run dist > /dev/null
  if [ ! -f dist/app*.js ]; then
    >&2 echo "Failed to create dist"
    exit 1
  fi
}

verify_autobuild() {
  npm start > /dev/null 2>&1 &
  PID=$!
  disown
  sleep 4
  curl -s http://127.0.0.1:8080/src/index.html > first.txt
  echo 'console.log("hi")' >> src/index.js
  sleep 1
  curl -s http://127.0.0.1:8080/src/index.html > second.txt
  diff first.txt second.txt > /dev/null
  if [ $? -eq 0 ]; then
    echo "Webpack auto build is not working"
    exit 1
  fi
  sleep 1
  kill $PID
}

if [ "$1" = "clean" ]; then
  cd /tmp/$PROJECT_NAME
  clean_up
  exit 0
fi

setup
run_tests
clean_up
