import LaTeXCompiler from '../../LaTeXCompiler';

export default function list(
  this: LaTeXCompiler,
  node: any,
) {
  const listType = (node.ordered) ? 'enumerate' : 'itemize';
  const numStart = parseInt(node.start, 10) || 1;

  const results = [
    `\\begin{${listType}}`,
    `\\setcounter{enumi}{${numStart}}`,
    this.all(node).join('\n'),
    `\\end{${listType}}`,
  ];

  return results.join('\n');
}
