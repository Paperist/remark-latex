import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

import LaTeXCompiler from '../../LaTeXCompiler';

export default function joinWithLineBreak(
  this: LaTeXCompiler,
  node: UNIST.Parent
) {
  const value = this.all(node).join('\n');
  return defaultsDeep(
    {
      value,
    },
    node
  ) as UNIST.Node;
}
