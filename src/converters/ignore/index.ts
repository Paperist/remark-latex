import { UNIST } from 'unist';

export default function ignore() {
  return {
    type: 'ignore',
  } as UNIST.Node;
}
