export function getSlug(path: string): string {
  const arr = path.split("/");
  return arr[arr.length - 1].split(".")[0];
}

export const BASE = import.meta.env.BASE_URL.slice(0, -1);

export function withBase(path: string) {
  return `${BASE}${path}`;
}
