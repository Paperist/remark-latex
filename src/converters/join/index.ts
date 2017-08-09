import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

import LaTeXCompiler from '../../LaTeXCompiler';

export default function join(this: LaTeXCompiler, node: UNIST.Parent) {
  const value = this.all(node).join('').trim().replace(/\t/g, '\x20\x20');
  return defaultsDeep(
    {
      value,
    },
    node
  ) as UNIST.Node;
}
