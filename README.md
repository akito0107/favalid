# favalid

[![Greenkeeper badge](https://badges.greenkeeper.io/akito0107/favalid.svg)](https://greenkeeper.io/)

Validator Framework for javascript.

[![npm version](https://badge.fury.io/js/favalid.svg)](https://badge.fury.io/js/favalid)
[![CircleCI](https://circleci.com/gh/akito0107/favalid.svg?style=svg)](https://circleci.com/gh/akito0107/favalid)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6589638b133763bcc95a/test_coverage)](https://codeclimate.com/github/akito0107/favalid/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/6589638b133763bcc95a/maintainability)](https://codeclimate.com/github/akito0107/favalid/maintainability)

## Getting Started

### Prerequisites
- Node.js v8+
- npm or yarn

### Installing
```
$ npm install favalid
```

### Usage
#### Primitive Validator
1. Write higher order validator using `tester()`.
`tester()` takes two arguments. first argument is `(value: any) => bool` function, which represent validation rules.
Second argument is `() => string` function, which represents validation error message.

```js
import { tester } from 'favalid';

const validator = tester((targetValue) => {
  return targetValue < 100;
}, () => {
  return 'must be less than 100';
})
```

2. Use it!
`tester()` returns simple validator function, `(value: any) => ({error: bool, message: string})`.

```js
console.log(validator(99)); // => { error: false, message: '' }
console.log(validator(101)); // => { error: true, message: 'must ne less than 100' }
```

#### Combined Validator
1. You can combine these validators using `combine(...validators)`.
`combine()` returns also validator.
```js
import { tester, combine } from 'favalid';
const validator1 = tester((targetValue) => {
  return targetValue < 100;
}, () => {
  return 'must be less than 100';
})

const validator2 = tester((targetValue) => {
  return targetValue > 20;
}, () => {
  return 'must be higher than 20';
})

const combinedValidator = combine(validator1, validator2)
```

2. Use it.
```js
console.log(combinedValidator(80)) // { error: false, message: '' }

console.log(combinedValidator(101)) // { error: true, message: 'must be less than 100' }

console.log(combinedValidator(19)) // { error: true, message: 'must be higher than 20' }
```

If target values are failed multiple tests, combined validator returns first failed message. 
 ```js
 import { tester, combine } from 'favalid';
 const minLength = tester((targetValue) => {
   return [...targetValue].length > 2;
 }, () => {
   return 'too few letters';
 })
 
 const regex = tester((targetValue) => {
   return /^[a-zA-Z]+$/.test(targetValue) // only contains alphabet letters.
 }, () => {
   return 'invalid format';
 })
 
 const combinedValidator = combine(minLength, regex)
 
 console.log(combinedValidator('a')) // { error: true, message: 'too few letters' }
 
 console.log(combinedValidator('1')) // { error: true, message: 'too few letters' }
 
 console.log(combinedValidator('asdf1')) // {  error: true, message: 'invalid format' }

```

#### Using Predefined Higher Order Validators
You can also use predefined higher order validators found on `favalid/lib/validators`.
These validators can be combined with your original validators.

```js
import { tester, combine, minLength, regexp } from 'favalid';
 
 const combinedValidator = combine(
   minLength(3, () => 'too few letters'), 
   regexp(/^[a-zA-Z]+$/, () => "invalid format", {}),
   tester(() => {
     // some original validation rules
   }, () => ('original error')),
 )

```


#### Validation Result Reducers
You can aggregate validate errors with your customize error reducer using `conbimeWithReducer(reducer, initialValue, ...validators)`.

```js
import { tester, combineWithReducer, minLength, maxLength, regexp } from 'favalid';

const REQUIRED_EMAIL_MESSAGE = () => "required.";

const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEXP_MESSAGE = () => "invalid email.";

const EMAIL_MAX_LENGTH = 100;
const MAX_LENGTH_MESSAGE = () => "exceeds 100 letters.";

const EMAIL_MIN_LENGTH = 10;
const MIN_LENGTH_MESSAGE = () => "at least 10 letters.";

const emailValidatorWithMultipleErrorReducer = (email: string) => {
  const reducer = (prevError, currentError) => {
    if (currentError.error) {
      prevError.push(currentError);
    }
    return prevError;
  };

  return combineWithReducer(
    reducer,
    [],
    required(REQUIRED_EMAIL_MESSAGE),
    minLength(EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(EMAIL_REGEXP, REGEXP_MESSAGE, {})
  )(email);
};

console.log(emailValidatorWithMultipleErrorReducer('valid@valid.com')) // => []
console.log(emailValidatorWithMultipleErrorReducer('aaa')) // => [{error: true, message: 'at least 10 letters.'}, {error: true, message: 'invalid email.'}]
```


### Examples
See [src/examples](src/examples).

## License
This project is licensed under the Apache License 2.0 License - see the [LICENSE](LICENSE) file for details
