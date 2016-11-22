export default function crossReference(
  node: any,
) {
  const results: string[] = [];
  const refs: string[] = [];
  const cites: string[] = [];

  const ids =
    (<string> node.identifier).split(';')
      .map((ref) => ref.trim())
      .filter((ref) => ref.match(/^@/))
      .map((ref) => ref.replace(/^@/, ''));

  for (const id of ids) {
    if (id.match(/^(?:fig|tbl|sec):/)) {
      refs.push(id);
    } else {
      cites.push(id);
    }
  }

  if (refs.length) {
    results.push(...refs.map((ref) => `\\ref{${ref}}`));
  }
  if (cites.length) {
    results.push(`\\cite{${cites.join(',')}}`);
  }
  return results.join('');
}
