if exists('g:loaded_denops_benchmark')
  finish
endif
let g:loaded_denops_benchmark = 1

function! s:benchmark() abort
  call denops#request('denops-benchmark', 'benchmark', [
        \ g:denops_benchmark_size,
        \ g:denops_benchmark_count,
        \ g:denops_benchmark_n,
        \])
endfunction

command! DenopsBenchmark call s:benchmark()

let g:denops_benchmark_size = get(g:, 'denops_benchmark_size', 64)
let g:denops_benchmark_count = get(g:, 'denops_benchmark_count', 1000)
let g:denops_benchmark_n = get(g:, 'denops_benchmark_n', 100)
