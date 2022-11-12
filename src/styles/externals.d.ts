// https://stackoverflow.com/questions/46501297/typescript-cant-find-module-less
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
