import LaTeXCompiler from '../../LaTeXCompiler';

export default function code(
  this: LaTeXCompiler,
  node: any,
) {
  node.value = (node.value) ? node.value.replace(/\t/g, '\x20\x20') : '';

  const results = [
    '\\begin{verbatim}',
    this.visitors.text.call(this, node),
    '\\end{verbatim}',
  ];

  return results.join('\n');
}
