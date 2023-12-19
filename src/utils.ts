

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(Date.parse(timestamp));
  const result = date.toLocaleString();
  return result;
}

export const slugOf = (input: string): string => {
  return input.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
