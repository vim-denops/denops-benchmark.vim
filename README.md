# denops-benchmark

A [denops][denops] plugin to measure performance of calls manually.

[denops]: https://github.com/vim-denops/denops.vim

https://user-images.githubusercontent.com/546312/235336285-e563dbcf-7d53-43fb-93ed-28211d6f8095.mp4

## Usage

Use `DenopsBenchmark` command to measure performance of `denops.call()` and
`denops.batch()`.

```
:DenopsBenchmark
```

It opens a non-file buffer and print the result like

```
info
  size:   64 bytes
  count:  1000
  n:      100
denops.call()
  sum:     11813 ms
  mean:    118.1 ms
  median:  111.3 ms
  stddev:  42.3
  stderr:  4.2 ms
  opms:    8.7±0.1 ops/ms
  cpms:    559.5±5.5 chars/ms
denops.batch()
  sum:     280 ms
  mean:    2.8 ms
  median:  2.7 ms
  stddev:  0.5
  stderr:  0.0 ms
  opms:    362.8±3.8 ops/ms
  cpms:    23221.5±241.2 chars/ms
```

The "opms" means "Operations per milliseconds" and "cpms" means "Characters per
milliseconds".

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
