export default function crossReferenceLabel(
  node: any,
) {
  return `\\label{${node.label}}`;
}
