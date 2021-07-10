# denops-benchmark

A [denops][] plugin to measure performance of calls manually.

[denops]: https://github.com/vim-denops/denops.vim

## Usage

Use `DenopsBenchmark(s, n)` or `DenopsBenchmarkBatch(s, n)`.
The `s` is data size and `n` is iteration count.

```
:call DenopsBenchmark(10, 100)
```

```
:call DenopsBenchmarkBatch(10, 100)
```

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
