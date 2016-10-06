# tz-format [![Build Status](https://travis-ci.org/SamVerschueren/tz-format.svg?branch=master)](https://travis-ci.org/SamVerschueren/tz-format)

> Format a date with timezone: `2015-11-30T10:40:35+01:00`


## Install

```
$ npm install --save tz-format
```


## Usage

```js
const format = require('tz-format');

format();
//=> '2015-11-30T10:40:35+01:00'

format(new Date());
//=> '2015-11-30T10:40:35+01:00'

format(new Date(2015, 11, 25, 11, 0, 0, 0));
//=> '2015-12-25T11:00:00+01:00'
```


## API

### format([date])

#### input

Type: `date`<br>
Default: `new Date()`


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
