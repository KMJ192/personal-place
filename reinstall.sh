#!/bin/bash

rm -rf .yarn* .pnp* yarn.lock yarn-error.log node_modules
yarn set version berry
# yarn set version 3.6.1
yarn install
yarn dlx @yarnpkg/sdks vscode
yarn plugin import typescript