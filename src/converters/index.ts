import { UNIST } from 'unist';
import LaTeXCompiler from '../LaTeXCompiler';

import join from './join';
import joinWithLineBreak from './joinWithLineBreak';

import ignore from './ignore';
import escape from './escape';
import heading from './heading';
import reference from './reference';
import image from './image';
import footnote from './footnote';
import table from './table';
import crossReference from './crossReference';
import footnoteReference from './footnoteReference';
import math from './math';

const raw = (node: UNIST.Node) => node;

export interface Converters {
  [key: string]: (
    this: LaTeXCompiler,
    node: UNIST.Node,
    parent?: UNIST.Parent
  ) => UNIST.Node;
}

export { LaTeXCompiler };
export default {
  ignore,
  image,
  table,
  heading,
  footnote,
  crossReference,
  footnoteReference,
  math,
  yaml: ignore,
  html: ignore,
  definition: ignore,
  tableCaption: ignore,
  footnoteDefinition: ignore,
  delete: join,
  strong: join,
  emphasis: join,
  tableCell: join,
  paragraph: join,
  link: join,
  root: joinWithLineBreak,
  blockquote: joinWithLineBreak,
  list: joinWithLineBreak,
  listItem: joinWithLineBreak,
  tableRow: joinWithLineBreak,
  code: raw,
  crossReferenceLabel: raw,
  text: escape,
  inlineCode: escape,
  linkReference: reference,
  imageReference: reference,
} as Converters;
