import LaTeXCompiler from '../../LaTeXCompiler';

export default function link(
  this: LaTeXCompiler,
  node: any,
) {
  const result =
    `\\href{${node.href}}{${this.all(node).join('')}}`;
  return result;
}
