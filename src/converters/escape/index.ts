export default function escape(
  node: any,
) {
  node.value = escapeLaTeX(convertQuote(node.value));
  return node;
}

function escapeLaTeX(
  text: string,
) {
  const escapedText =
    text.replace(/[\{\}#\$%&_]/g, '\\$&')
      .replace(/[|]/g, '\\verb+$&+')
      .replace(/[<>^~]/g, '\\verb|$&|')
      .replace(/\\\\/g, '\\verb|\\|');
  return escapedText;
}

function convertQuote(
  text: string,
) {
  const convertedText =
    text.replace(/'(.+?)'/g, '`$1\'')
      .replace(/"(.+?)"/g, '``$1\'\'');
  return convertedText;
}
