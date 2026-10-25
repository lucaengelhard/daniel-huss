export function getSlug(path: string): string {
  const arr = path.split("/");
  return arr[arr.length - 1].split(".")[0];
}
