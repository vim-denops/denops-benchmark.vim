if exists('g:loaded_denops_benchmark')
  finish
endif
let g:loaded_denops_benchmark = 1

let s:loaded = reltime()

function! s:record(message) abort
  let diff = reltimefloat(reltime(s:loaded))
  echohl COMMENT
  echomsg printf('[denops-benchmark] %5f: %s', diff, a:message)
  echohl NONE
endfunction

augroup denops_benchmark_internal
  autocmd!
  autocmd User DenopsReady,DenopsStarted call s:record(expand('<amatch>:t'))
  autocmd User DenopsPluginPre:* call s:record(expand('<amatch>:t'))
  autocmd User DenopsPluginPost:* call s:record(expand('<amatch>:t'))
augroup END
