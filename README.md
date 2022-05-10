# Code Runner

This runs code blocks and outputs code blocks that contain the output of the run.

For example with JavaScript I can do the following:

```js
const hi = "hi"
console.log(hi)
```

```txt output
hi
```

and variables are kept in scope so I can then follow it up with a following code block like:

```js
const there = 'there'
console.log(`${hi} ${there}`)
```

```txt output
hi there
```

```js
console.log(`${hi} ${there}`)
```

```txt output
hi there
```

### Usage

This README.md is updated by running `yarn start md -w README.md`

### Supported languages

zsh and bash (hidden first)

<details>
  <summary>Hidden - cd to another directory</summary>

```zsh
cd ..
```

```txt output
```

</details>

```zsh
echo "hi"
```

```txt output
hi
```

### TODO

1.  Add support for "hidden", and "ignore" meta tags
2.  Add better HTML styling.
