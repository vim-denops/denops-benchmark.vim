if exists('g:loaded_denops_benchmark')
  finish
endif
let g:loaded_denops_benchmark = 1

function! s:record(message) abort
  let diff = reltimefloat(reltime(s:loaded))
  echohl COMMENT
  echomsg printf('[denops-benchmark] %5f: %s', diff, a:message)
  echohl NONE
endfunction

augroup denops_benchmark_internal
  autocmd!
  autocmd User DenopsStarted let s:loaded = reltime()
  autocmd User DenopsReady call s:record(expand('<amatch>:t'))
  autocmd User DenopsWorker* call s:record(expand('<amatch>:t'))
  autocmd User DenopsPlugin* call s:record(expand('<amatch>:t'))
augroup END
