import { UNIST } from 'unist';
import { defaultsDeep } from 'lodash';

export default function escape(node: UNIST.Text) {
  return defaultsDeep(
    {
      value: escapeLaTeX(convertQuote(node.value)),
    },
    node
  ) as UNIST.Node;
}

function escapeLaTeX(text: string) {
  const escapedText = text.replace(/\\\\|[\{\}#\$%&_]|[|]|[<>^~]/g, str => {
    if (str === '\\\\') {
      return '\\textbackslash{}';
    } else if (str.match(/[\{\}#\$%&_]/)) {
      return `\\${str}`;
    } else if (str.match(/[|]/)) {
      return '\\verb+|+';
    } else {
      return `\\verb|${str}|`;
    }
  });
  return escapedText;
}

function convertQuote(text: string) {
  const convertedText = text
    .replace(/'(.+?)'/g, "`$1'")
    .replace(/"(.+?)"/g, "``$1''");
  return convertedText;
}
