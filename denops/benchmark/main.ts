import { Denops } from "https://deno.land/x/denops_std@v1.0.0-beta.2/mod.ts";
import { execute, batch } from "https://deno.land/x/denops_std@v1.0.0-beta.2/helper/mod.ts";
import { ensureNumber } from "https://deno.land/x/unknownutil@v0.1.1/mod.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    benchmark(s: unknown, n: unknown) {
      ensureNumber(s);
      ensureNumber(n);
      const proc = async (denops: Denops, data: string, n: number) => {
        for (let i=0; i<n; i++) {
          await denops.call('append', 0, data);
        }
      };
      return benchmark(denops, proc, s, n);
    },

    benchmarkBatch(s: unknown, n: unknown) {
      ensureNumber(s);
      ensureNumber(n);
      const proc = async (denops: Denops, data: string, n: number) => {
        await batch(denops, (helper) => {
          for (let i=0; i<n; i++) {
            helper.call('append', 0, data);
          }
        });
      };
      return benchmark(denops, proc, s, n);
    },
  };

  await execute(
    denops,
    `
    function! DenopsBenchmark(s, n) abort
      call denops#notify('${denops.name}', 'benchmark', [a:s, a:n])
    endfunction

    function! DenopsBenchmarkBatch(s, n) abort
      call denops#notify('${denops.name}', 'benchmarkBatch', [a:s, a:n])
    endfunction
    `
  );
}

async function benchmark(denops: Denops, proc: (denops: Denops, data: string, n: number) => Promise<void>, s = 100, n =1000): Promise<void> {
  await denops.cmd("new");
  await denops.cmd("setlocal bufhidden=wipe");
  const data = "a".repeat(s);
  const startTime = Date.now();
  await proc(denops, data, n);
  const endTime = Date.now();
  const diff = endTime - startTime;
  await denops.cmd("q!")
  const charsec = (s * n / diff).toPrecision(3);
  const callsec = (n / diff).toPrecision(3);
  console.log(`${charsec} char/sec (${callsec} call/sec)`);
}
