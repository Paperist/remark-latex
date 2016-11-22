import LaTeXCompiler from '../LaTeXCompiler';
import ignore from './ignore';
import unknown from './unknown';
import root from './root';
import text from './text';
import heading from './heading';
import paragraph from './paragraph';
import blockquote from './blockquote';
import list from './list';
import listItem from './listItem';
import inlineCode from './inlineCode';
import code from './code';
import thematicBreak from './thematicBreak';
import strong from './strong';
import emphasis from './emphasis';
import hardBreak from './break';
import strikethrough from './delete';
import link from './link';
import linkReference from './linkReference';
import image from './image';
import imageReference from './imageReference';
import footnote from './footnote';
import footnoteReference from './footnoteReference';
import table from './table';
import tableCell from './tableCell';
import crossReference from './crossReference';

export { LaTeXCompiler };
export default {
  unknown,
  ignore,
  yaml: ignore,
  definition: ignore,
  html: ignore,
  root,
  text,
  heading,
  paragraph,
  blockquote,
  list,
  listItem,
  inlineCode,
  code,
  thematicBreak,
  strong,
  emphasis,
  break: hardBreak,
  delete: strikethrough,
  link,
  linkReference,
  image,
  imageReference,
  footnote,
  footnoteReference,
  table,
  tableCell,
  tableCaption: ignore,
  crossReferenceLabel: ignore,
  crossReference,
};
