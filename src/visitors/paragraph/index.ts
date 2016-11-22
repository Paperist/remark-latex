import LaTeXCompiler from '../../LaTeXCompiler';

export default function paragraph(
  this: LaTeXCompiler,
  node: any,
) {
  const content =
    this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
  return content;
}
