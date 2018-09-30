'use strict';
const fs = require('fs');
const eol = require('os').EOL;
const csv = require('csv');
const isValidPath = require('is-valid-path');
const pify = require('pify');

const validateHeader = header => header.filter(x => typeof x !== 'string').length === 0;
const delimiters = [',', ';'];
const pattern = /(.*?)\.(csv)/i;

module.exports = (path, options) => {
	let getHeader = false;
	let csvHeader;

	if (!isValidPath(path)) {
		throw new Error('Invalid path');
	}

	if (!path.match(pattern)) {
		throw new Error('Invalid file, not a CSV');
	}

	if (options) {
		if (options.header) {
			if (!Array.isArray(options.header) || options.header.length === 0) {
				throw new Error('Invalid header argument');
			}

			if (!validateHeader(options.header)) {
				throw new Error('Header argument can only contains strings');
			}

			getHeader = true;
			csvHeader = options.header.map(item => item.toLowerCase());
		}

		if (options.destination && !isValidPath(options.destination)) {
			throw new Error('Invalid destination path');
		}

		if (options && options.delimiter) {
			if (delimiters.indexOf(options.delimiter) === -1) {
				throw new Error('Invalid delimiter');
			}
		}
	}

	try {
		const stream = fs.createReadStream(path)
			.pipe(csv.parse({delimiter: options && options.delimiter ? options.delimiter : ','}))
			.pipe(csv.transform(record => {
				const result = {};

				if (!getHeader) {
					getHeader = true;
					csvHeader = record.map(item => item.toLowerCase());
					return;
				}

				for (const attribute of csvHeader) {
					result[attribute] = record[csvHeader.indexOf(attribute)];
				}
				return JSON.stringify(result) + eol;
			}));

		if (options && options.destination) {
			stream.pipe(fs.createWriteStream(options.destination));
			return pify(stream).on('end');
		}

		return stream;
	} catch (err) {
		console.error(err);
		throw new Error('Tranforming CSV to ndjson failed');
	}
};
