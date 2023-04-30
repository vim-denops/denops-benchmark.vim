import { Denops } from "https://deno.land/x/denops_std@v4.1.5/mod.ts";
import { batch } from "https://deno.land/x/denops_std@v4.1.5/batch/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v4.1.5/function/mod.ts";
import { assertNumber } from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import { progressbar } from "./progressbar.ts";
import { bench } from "./bench.ts";
import { calc } from "./statistical.ts";

export function main(denops: Denops): void {
  denops.dispatcher = {
    async benchmark(size: unknown, count: unknown, n: unknown) {
      assertNumber(size);
      assertNumber(count);
      assertNumber(n);

      await denops.cmd("tabnew");
      await denops.cmd("setlocal bufhidden=wipe buftype=nofile");

      const width = Math.min(80, await fn.winwidth(denops, 0) as number);
      const data = ".".repeat(size);
      const resultCall = await benchmark(size, count, n, async () => {
        for (let i = 0; i < count; i++) {
          await denops.call("denops_benchmark#discard", data);
        }
      }, async (i, n) => {
        await batch(denops, async (denops) => {
          await denops.call("setline", 1, [
            "Benchmarking 'denops.call()' ...",
            progressbar(i + 1, n, {
              width: width / 2,
              suffix: ` ${((i + 1) / n * 100).toFixed().padStart(2)}%`,
            }),
          ]);
          await denops.cmd("redraw");
        });
      });
      const resultBatch = await benchmark(size, count, n, async () => {
        await batch(denops, async (denops) => {
          for (let i = 0; i < count; i++) {
            await denops.call("denops_benchmark#discard", data);
          }
        });
      }, async (i, n) => {
        await batch(denops, async (denops) => {
          await denops.call("setline", 1, [
            "Benchmarking 'denops.batch()' ...",
            progressbar(i + 1, n, {
              width: width / 2,
              suffix: ` ${((i + 1) / n * 100).toFixed().padStart(2)}%`,
            }),
          ]);
          await denops.cmd("redraw");
        });
      });
      await batch(denops, async (denops) => {
        await denops.call("setline", 1, [
          "info",
          `  size:   ${size} bytes`,
          `  count:  ${count}`,
          `  n:      ${n}`,
          "denops.call()",
          ...resultCall.map((v) => `  ${v}`),
          "denops.batch()",
          ...resultBatch.map((v) => `  ${v}`),
        ]);
      });
    },
  };
}

async function benchmark(
  size: number,
  count: number,
  n: number,
  f: () => Promise<void>,
  progress?: (i: number, n: number) => Promise<void>,
): Promise<string[]> {
  const rs = await bench(n, f, {
    progress,
  });
  const { sum, mean, median, stddev, stderr } = calc(rs);
  // Operations per millisecond
  const opms = calc(rs.map((v) => count / v));
  // Chars per millisecond
  const cpms = calc(rs.map((v) => size * count / v));
  const content = [];
  content.push(`sum:     ${sum.toFixed()} ms`);
  content.push(`mean:    ${mean.toFixed(1)} ms`);
  content.push(`median:  ${median.toFixed(1)} ms`);
  content.push(`stddev:  ${stddev.toFixed(1)}`);
  content.push(`stderr:  ${stderr.toFixed(1)} ms`);
  content.push(
    `opms:    ${opms.mean.toFixed(1)}±${opms.stderr.toFixed(1)} ops/ms`,
  );
  content.push(
    `cpms:    ${cpms.mean.toFixed(1)}±${cpms.stderr.toFixed(1)} chars/ms`,
  );
  return content;
}
