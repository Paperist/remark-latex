# @paperist/remark-latex

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-latex
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme

[npm-badge]: https://img.shields.io/npm/v/@paperist/remark-latex.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURcwAAOeIiP////G7u/ri4tIZGdpFReJsbPC3t075sZwAAAAvSURBVCjPY2CgDWAThIMEsACjEhwIUCZg0dGCIqASwMAxMgXAgSzOwMAOC2TqAwBvzR4JxLaP0gAAAABJRU5ErkJggg==
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURSBTICJcIiNgIiZoJTuhNyt3Kf///%2BCqxSgAAAAGdFJOUwpclbn%2B4Fj6/H8AAAABYktHRAZhZrh9AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AkEEjEV7MDQQwAAAGBJREFUCNc1TUEKgDAMi07vE/Q%2BRD8g%2B4BbvAvi/79iMjDQJm1CC6BbDzRsZI3incIpYeYFhCaYnLiyPYnYkwWZFWoFHrSuttCmmbwXh0eJQYVON4JthZTxCzzAmyb8%2BAAKXBRyN6RyZQAAAABJRU5ErkJggg==
[standard-readme-badge]: https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square

> [wooorm/remark] plugin for latex

[wooorm/remark]: https://github.com/wooorm/remark

## Table of Contents

<!-- TOC depthFrom:2 depthTo:3 updateOnSave:false -->

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [Syntax](#syntax)
  - [Configure](#configure)
- [Contribute](#contribute)
- [License](#license)

<!-- /TOC -->

## Install

```
npm i remark remark-cli @paperist/remark-latex
```

## Usage

### CLI

See [here][remark-cli] for more details.

```bash
remark -u @paperist/remark-latex document.md -o document.tex
```

If you configure via `rc` file, you should type below.

```bash
remark -r ./remarkrc.yml document.md -o document.tex
```

[remark-cli]: https://github.com/wooorm/remark/tree/master/packages/remark-cli#cli

### Syntax

Inspired by [pandoc-crossref].

[pandoc-crossref]: https://github.com/lierdakil/pandoc-crossref

#### Image label

```md
![Caption](file.ext){#fig:label}
```

#### Equation label

```md
$$ math $$ {#eq:label}
```

#### Table caption / label

```md
|  a  |  b  |  c  |
|:---:|:---:|:---:|
|  1  |  2  |  3  |

: Caption {#tbl:label}
```

#### Section label

```md
# Section {#sec:section}
```

#### Code block label

**Not implemented**

#### References

##### From label (e.g. Figure)

```md
[@fig:label1] or [@fig:label1;@fig:label2;...]
```

##### BibTeX

```md
[@jones99] or [@jones99;@smith06;...]
```

### Configure

#### Fields

|    Field     |                      Description                       |
| :----------: | :----------------------------------------------------- |
| baseTemplate | The document template                                  |
| documentInfo | The data passed to the base template                   |
| imageConfigs | `\includegraphics` configs                             |
| templatesDir | Template folder for AST (See [`templates`][templates]) |

[templates]: https://github.com/Paperist/remark-latex/tree/master/src/templates

##### Templates

You can use [ejs] template.
remark-latex read `baseTemplate` and bind `documentInfo` to output.

[ejs]: https://github.com/mde/ejs

```latex
%% TeX Template written by ejs format.

\author{<%= author %>}
\title{<%= title %>}

\begin{document}

\maketitle

%% Render results will be exported as `body`.
<%= body %>

\end{document}
```

#### `remarkrc`

You can configure via `rc` file (e.g. `remarkrc.json`, `remarkrc.yml`).
See also [here][remarkrc].

```yml
# Required
output: true
plugins:
  - "@paperist/remark-latex"

# Optional
# NOTE: You should put remark-latex configs under `latex`.
settings:
  latex:
    baseTemplate: latex/template.tex
    imageConfigs:
      width: 0.9\linewidth
    documentInfo:
      title: A Survey on Markdown
      author:
        - John Smith
```

[remarkrc]: https://github.com/unifiedjs/unified-engine/blob/master/doc/configure.md

#### YAML Frontmatter

You can configure each files via YAML Frontmatter.
See also [here][yaml-frontmatter]


```md
---
baseTemplate: ../latex/template.tex
---

# Hello World
Lorem ipsum dolor sit amet...
```

[yaml-frontmatter]: https://github.com/wooorm/remark-frontmatter

## Contribute

PRs accepted.

## License

![3846masa] MIT (c) 3846masa

[3846masa]: https://www.gravatar.com/avatar/cfeae69aae4f4fc102960f01d35d2d86?s=50

