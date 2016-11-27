export default function crossReference(
  node: any,
) {
  const refs: string[] = [];
  const cites: string[] = [];

  const ids =
    (<string> node.identifier).split(';')
      .map((ref) => ref.trim())
      .filter((ref) => ref.match(/^@/))
      .map((ref) => ref.replace(/^@/, ''));

  for (const id of ids) {
    if (id.match(/^(?:fig|tbl|sec|eq|lst):/)) {
      refs.push(id);
    } else {
      cites.push(id);
    }
  }

  return Object.assign({}, node, { refs, cites });
}
