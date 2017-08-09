import * as libpath from 'path';
import * as findUp from 'find-up';

export default function searchFile(
  relativePath: string | null,
  cwd: string = process.cwd()
) {
  if (!relativePath || libpath.isAbsolute(relativePath)) {
    return relativePath;
  }

  const path = findUp.sync(relativePath, { cwd });
  if (!path) {
    console.warn(`WARN: ${relativePath} is not found.`);
  }
  return path;
}
