import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';

export default function crossReference(node: MDAST.CrossReference) {
  const refs: string[] = [];
  const cites: string[] = [];

  for (const id of node.identifiers) {
    if (/^(?:fig|tbl|sec|eq|lst):/.test(id)) {
      refs.push(id);
    } else {
      cites.push(id);
    }
  }

  return defaultsDeep({ refs, cites }, node) as UNIST.Node;
}
