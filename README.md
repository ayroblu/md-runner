Code Runner
===========

This runs code blocks and outputs code blocks that contain the output of the run.

For example with JavaScript I can do the following:

```js
const hi = "hi"
console.log(hi)
```

and variables are kept in scope so I can then follow it up with a following code block like:

```js
const there = 'there'
console.log(`${hi} ${there}`)
```

### Supported languages

zsh and bash

```zsh
echo "hi"
```
