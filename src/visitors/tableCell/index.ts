import LaTeXCompiler from '../../LaTeXCompiler';

export default function tableCell(
  this: LaTeXCompiler,
  node: any,
) {
  return this.all(node).join('');
}
