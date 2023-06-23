export function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, `_`)
    .replace(/__+/g, `_`)
    .replace(/^_+|_+$/g, ``);
}
