import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';
import visit = require('unist-util-visit');

import LaTeXCompiler, { ConvertOptionsNode } from '../../LaTeXCompiler';

export default function table(
  this: LaTeXCompiler,
  node: MDAST.Table & ConvertOptionsNode,
  parent: UNIST.Parent
) {
  const align = node.align.concat().map(a => a || 'left');
  const alignStr =
    align.shift()![0].toLowerCase() +
    '|' +
    align.map(align => align[0]).join('').toLowerCase();

  let label = '';
  let caption = '';

  const nextNodeIdx = node.index + 1;
  const nextNode = parent.children[nextNodeIdx];

  if (nextNode && nextNode.type === 'tableCaption') {
    const tblCapNode = nextNode as MDAST.TableCaption;
    visit(
      tblCapNode,
      'crossReferenceLabel',
      (crNode: MDAST.CrossReferenceLabel) => {
        label += this.convert(crNode);
        Object.assign(crNode, { type: 'ignore' });
        return true;
      }
    );
    caption = this.all(tblCapNode).join('').replace(/\n/g, '').trim();
  }

  return defaultsDeep(
    {
      label,
      caption,
      align: alignStr,
      value: this.all(node).join('\n'),
    },
    node
  ) as UNIST.Node;
}
