import LaTeXCompiler from '../../LaTeXCompiler';

export default function unknown(
  this: LaTeXCompiler,
  node: any,
) {
  const content =
    ('children' in node) ? this.all(node).join('') : <string> node.value;
  return content;
}
