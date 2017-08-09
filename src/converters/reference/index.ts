import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';

import LaTeXCompiler from '../../LaTeXCompiler';

export default function reference(
  this: LaTeXCompiler,
  node: MDAST.LinkReference | MDAST.ImageReference,
  parent: UNIST.Parent
) {
  const identifier = node.identifier.toUpperCase();
  const def = this.definitions[identifier] || {};

  const bind = defaultsDeep(
    {
      type: node.type.replace('Reference', ''),
      value: node.type === 'linkReference' ? this.all(node).join('') : '',
      url: def.url,
      alt: def.title,
    },
    node
  ) as UNIST.Node;

  if (typeof this.converters[bind.type] === 'function') {
    return this.converters[bind.type].call(this, bind, parent);
  }
  return bind;
}
