import LaTeXCompiler from '../../LaTeXCompiler';

export default function strikethrough(
  this: LaTeXCompiler,
  node: any,
) {
  return `\\sout{${this.all(node).join('')}}`;
}
