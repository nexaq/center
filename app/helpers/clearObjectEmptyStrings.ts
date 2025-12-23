export function cleanObjectFromEmptyStrings<T extends Record<string, any>>(obj: T): T {
  const cleanedEntries = Object.entries(obj).filter(([, value]) => {
    return typeof value !== 'string' || value !== '';
  });

  return Object.fromEntries(cleanedEntries) as T;
}