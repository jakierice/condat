# condat

> A CLI tool for converting .csv files to .ndjson files.

This tool was created for the simple use case of converting .csv files to .ndjson files for the purpose of importing data to a [sanity.io](https://www.sanity.io/) backend CMS (Content Management System). We hope to expand this tool in the future to be able to convert more types of files. Enjoy!

## Usage

```bash
condat --source 'example-csv.csv' --destination 'ndjson-result.ndjson'
```
OR
```bash
condat -S 'example-csv.csv' -D 'ndjson-result.ndjson'
```

## Options

```bash
  -V, --version                    output the version number
  -S, --source [source]            String path to file that will be converted
  -D, --destination [destination]  String path to file where converted data will be written
  -h, --help                       output usage information
```

See [api_formatting.md](api_formatting.md) for tips.

## Install

With [npm](https://npmjs.org/) installed, run

```bash
$ npm install -g condat
```

With [yarn](https://yarnpkg.com/en/) installed, run

```bash
$ yarn global add condat
```

## Acknowledgments

condat is built using the following libraries:

- [`csv-to-ndjson`](https://github.com/simonjang/csv-to-ndjson)
- [`commander`](https://github.com/tj/commander.js)
- [`listr`](https://github.com/SamVerschueren/listr)

## See Also

- [`noffle/common-readme`](https://github.com/noffle/common-readme)
- []

## License

MIT

