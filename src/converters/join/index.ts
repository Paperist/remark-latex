import LaTeXCompiler from '../../LaTeXCompiler';

export default function blockquote(
  this: LaTeXCompiler,
  node: any,
) {
  node.value = this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
  return node;
}
