import LaTeXCompiler from '../../LaTeXCompiler';

export default function inlineCode(
  this: LaTeXCompiler,
  node: any,
) {
  return `\\texttt{${this.visitors.text.call(this, node)}}`;
}
