import LaTeXCompiler from '../../LaTeXCompiler';

export default function root(
  this: LaTeXCompiler,
  node: any,
) {
  return this.all(node).join('\n\n');
}
