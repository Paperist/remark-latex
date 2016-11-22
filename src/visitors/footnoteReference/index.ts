export default function footnoteReference(
  node: any,
) {
  return `\\footnotemark[${node.identifier}]`;
}
