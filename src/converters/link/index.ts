import { MDAST } from 'mdast';
import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

import LaTeXCompiler from '../../LaTeXCompiler';
import join from '../join';

export default function link(this: LaTeXCompiler, node: MDAST.Link) {
  // For auto-link
  if (node.children.every(node => node.type === 'text')) {
    const value = node.children
      .map((node: MDAST.TextNode) => node.value)
      .join('');
    if (node.url === value) {
      return defaultsDeep({ value }, node) as UNIST.Node;
    }
  }

  return join.call(this, node) as UNIST.Node;
}
