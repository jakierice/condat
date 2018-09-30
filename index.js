#!/usr/bin/env node

const program = require('commander');
const Listr = require('listr');
const csvToNdjson = require('csv-to-ndjson');

program
  .version('0.1.0')
  .option('-S, --source [source]', 'String path to file that will be converted')
  .option(
    '-D, --destination [destination]',
    'String path to file where converted data will be written'
  )
  .parse(process.argv);

function validateSource(sourcePath) {
  console.log(sourcePath);
  if (!sourcePath) {
    throw new Error('Please provide a valid source file path');
  }
}

function convert(sourcePath, destinationPath) {
  csvToNdjson(sourcePath, {
    destination: destinationPath
  }).then(success => {
    console.log('Successfully converted file');
  });
}

new Listr([
  {
    title: 'Checking source file',
    task: () => validateSource(program.source)
  },
  {
    title: 'Converting file',
    task: () => convert(program.source, program.destination)
  }
]).run();
