import LaTeXCompiler from '../../LaTeXCompiler';

export default function link(
  this: LaTeXCompiler,
  node: any,
) {
  const result =
    `\\href{${node.url}}{${this.all(node).join('')}}`;
  return result;
}
