import LaTeXCompiler from '../../LaTeXCompiler';

export default function blockquote(
  this: LaTeXCompiler,
  node: any,
) {
  const result =
    `\\begin{quote}\n${this.all(node).join('\n')}\n\\end{quote}`;
  return result;
}
