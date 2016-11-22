import LaTeXCompiler from '../../LaTeXCompiler';

export default function strong(
  this: LaTeXCompiler,
  node: any,
) {
  return `\\textbf{${this.all(node).join('')}}`;
}
