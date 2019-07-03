<h2 align="center">Substample</h2>

Project `Substample` - is an example for substrate with polkadot-js

## Build Client

``` bash
# go to client
$ cd client

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Build Blockchain

``` bash
# go to substrate node
$ cd node

# build runtime
$ ./scripts/build.sh

# build node and serve at localhost:9944
$ cargo run -- --dev
```
