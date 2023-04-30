export type StatisticalResult = {
  sum: number;
  mean: number;
  median: number;
  stddev: number;
  stderr: number;
};

export function calc(vs: number[]): StatisticalResult {
  vs.sort();
  const len = vs.length;
  const sum = vs.reduce((a, b) => a + b, 0);
  const mean = sum / len;
  const median = vs[Math.floor(len / 2)];
  const stddev = Math.sqrt(
    vs.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / len,
  );
  const stderr = stddev / Math.sqrt(len);
  return { sum, mean, median, stddev, stderr };
}
