# kludge
[![NPM](https://nodei.co/npm/kludge.png)](https://nodei.co/npm/kludge/)

Run a Node snippet and resolve require()d external dependencies

Install it with `npm i kludge -g`

Let's say you only have a file like this `catface.js`:

```js
var cats = require('cat-ascii-faces')
console.log(cats())
```

```sh
$ kludge catface.js
```

It will download the `cat-ascii-faces` dependency and run the file.

