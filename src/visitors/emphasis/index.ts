import LaTeXCompiler from '../../LaTeXCompiler';

export default function emphasis(
  this: LaTeXCompiler,
  node: any,
) {
  return `\\emph{${this.all(node).join('')}}`;
}
