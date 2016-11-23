# remark-latex

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> [wooorm/remark] plugin for latex

[wooorm/remark]: https://github.com/wooorm/remark

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm i remark 3846masa/remark-crossref#build 3846masa/remark-latex#build
```

## Usage

```js
const remark = require('remark');
const crossref = require('remark-crossref');
const latex = require('remark-latex');

remark()
.use(crossref)
.use(latex)
.process(markdown, (err, vfile) => {
  if (err) {
    console.error(err);
  }
  console.log(vfile);
});
```

## Syntax

Inspired by [pandoc-crossref](https://github.com/lierdakil/pandoc-crossref).

### Image labels

```markdown
![Caption](file.ext){#fig:label}
```

### Equation labels

**Not implemented**

```markdown
$$ math $$ {#eq:label}
```

### Table labels

```markdown
|  a  |  b  |  c  |
|:---:|:---:|:---:|
|  1  |  2  |  3  |

: Caption {#tbl:label}
```

### Section labels

```markdown
# Section {#sec:section}
```

### Code Block labels

**Not implemented**

<pre>
```{#lst:code .haskell caption="Listing caption"}
main :: IO ()
main = putStrLn "Hello World!"
```
</pre>

### References

```markdown
[@fig:label1] or [@fig:label1;@fig:label2;...]
```

```markdown
[@jones99] or [@jones99;@smith06;...]
```

### YAML

#### Bibliography

**Not implemented**

## Contribute

PRs accepted.

## License

MIT © 3846masa
