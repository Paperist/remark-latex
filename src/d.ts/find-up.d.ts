declare module 'find-up' {
  interface findUp {
    (filename: string, options: { cwd: string }): Promise<string | null>;
    (filenames: string[], options: { cwd: string }): Promise<string | null>;
    sync(filename: string, options: { cwd: string }): string | null;
    sync(filenames: string[], options: { cwd: string }): string | null;
  }
  var findUp: findUp;
  export = findUp;
}
