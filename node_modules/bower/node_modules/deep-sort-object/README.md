# deep-sort-object [![Build Status](https://travis-ci.org/IndigoUnited/node-deep-sort-object.svg?branch=master)](https://travis-ci.org/IndigoUnited/node-deep-sort-object)


Simple module to sort objects recursively by its keys.


## Installation

`$ npm install deep-sort-object`


## Usage

```js
var sortobject = require('deep-sort-object');

sortobject({
    'z': 'foo',
    'b': 'bar',
    'a': [
        {
            'z': 'foo',
            'b': 'bar'
        }
    ]
});

/*
{
    'a': [
        {
            'b': 'bar',
            'z': 'foo'
        }
    ],
    'b': 'bar',
    'z': 'foo'
});
*/
```

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
