if exists('g:loaded_denops_benchmark')
  finish
endif
let g:loaded_denops_benchmark = 1

let s:started = reltime()

function! s:record() abort
  let diff = reltimefloat(reltime(s:started))
  echomsg printf('[denops-benchmark] Took %f seconds to wake.', diff)
endfunction

augroup denops_benchmark_internal
  autocmd!
  autocmd User DenopsPluginPost:denops-benchmark call s:record()
augroup END
