import LaTeXCompiler from '../../LaTeXCompiler';
import crossReferenceLabel from '../crossReferenceLabel';

export default function image(
  this: LaTeXCompiler,
  node: any,
  parent: any,
) {
  const title = node.title || node.alt;
  let label = '';
  const config = 'width=5cm,height=5cm,keepaspectratio';

  const nextNodeIdx = parent.children.indexOf(node) + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'crossReferenceLabel') {
    label = crossReferenceLabel.call(this, nextNode);
  }

  const results = [
    '\\begin{figure}[tb]',
    '\\begin{center}',
    `\\includegraphics[${config}]{${node.url}}`,
    `\\caption{${title.trim()}}`,
    ((label) ? label : ''),
    '\\end{center}',
    '\\end{figure}',
  ];

  return results.join('\n');
}
