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

```js ignore
// And I can skip some code blocks by adding an "ignore" to the code block attributes
throw new Error('skip me');
```

### Usage

This README.md is updated by running `yarn start md -w README.md`

### Example with stateful shell and detail summary

```zsh
pwd
```

```txt output
/Users/blu/ws/md-runner
```

<details>
  <summary>Hidden - cd to another directory</summary>

```zsh
cd ..
```

</details>

```zsh
pwd
```

```txt output
/Users/blu/ws
```

### Supported languages

*   js
*   zsh

### TODO

1.  Add support for "hidden", and "ignore" meta tags
2.  Add better HTML styling.

