export type ProgressbarOptions = {
  prefix?: string;
  suffix?: string;
  width?: number;
};

export function progressbar(
  done: number,
  total: number,
  options: ProgressbarOptions = {},
): string {
  const { prefix = "", suffix = "", width = 200 } = options;
  const n = width - prefix.length - suffix.length;
  const doneChars = Math.floor(done / total * n);
  const restChars = n - doneChars;
  const doneStr = "▦".repeat(doneChars);
  const restStr = "─".repeat(restChars);
  return `${prefix}${doneStr}${restStr}${suffix}`;
}
