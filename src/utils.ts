

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(Date.parse(timestamp));
  const result = date.toLocaleString();
  return result;
}
