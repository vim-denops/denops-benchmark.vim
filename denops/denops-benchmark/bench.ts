export type BenchOptions = {
  /**
   * The function called for each iteration of benchmarking.
   */
  progress?: (i: number, n: number) => void | Promise<void>;
};

/**
 * Benchmark the given function.
 *
 * The function is run `n` times and the result is returned.
 *
 * @param f The function to benchmark.
 * @param n The number of times to run the function.
 * @param options The options for benchmark.
 * @returns The benchmark result.
 */
export async function bench(
  n: number,
  f: () => unknown | Promise<unknown>,
  options: BenchOptions = {},
): Promise<number[]> {
  const { progress } = options;
  const rs: number[] = [];
  for (let i = 0; i < n; i++) {
    const s = performance.now();
    await f();
    const e = performance.now();
    rs.push(e - s);
    if (progress) {
      await progress(i, n);
    }
  }
  return rs;
}
