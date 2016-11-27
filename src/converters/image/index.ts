import LaTeXCompiler from '../../LaTeXCompiler';
import * as qs from 'querystring';

export default function image(
  this: LaTeXCompiler,
  node: any,
  parent: any,
) {
  node.caption = node.title || node.alt;
  node.label = node.label || '';

  const config = Object.assign({}, this.options.imageConfigs || {});

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'crossReferenceLabel') {
    node.label += this.convert(nextNode);
    Object.assign(config, nextNode.options || {});
  }

  node.config = qs.stringify(config, ',', '=', {
    encodeURIComponent: (c: string) => c,
  });

  return node;
}
