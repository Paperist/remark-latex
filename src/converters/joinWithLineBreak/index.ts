import LaTeXCompiler from '../../LaTeXCompiler';

export default function blockquote(
  this: LaTeXCompiler,
  node: any,
) {
  node.value = this.all(node).join('\n');
  return node;
}
