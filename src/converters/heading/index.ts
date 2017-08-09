import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import visit = require('unist-util-visit');
import { defaultsDeep } from 'lodash';

import LaTeXCompiler from '../../LaTeXCompiler';

export default function heading(this: LaTeXCompiler, node: MDAST.Heading) {
  let label = '';
  visit(node, 'crossReferenceLabel', (crNode: MDAST.CrossReferenceLabel) => {
    label += this.convert(crNode);
    Object.assign(crNode, { type: 'ignore' });
    return true;
  });

  return defaultsDeep(
    {
      label,
      value: this.all(node).join(''),
    },
    node
  ) as UNIST.Node;
}
