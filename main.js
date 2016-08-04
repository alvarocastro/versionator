#!/usr/bin/env node

const pkg = require('./package.json'),
	fs = require('fs'),
	lists = {
		prefixes: require('./lists/adjetives.json'),
		animals: require('./lists/animals.json')
	};

var generate = function () {
		var args = Array.prototype.slice.call(arguments),
			parts = [];

		args.forEach((list) => {
			parts.push(list[Math.floor(Math.random() * list.length)]);
		});

		return parts.join('');
	},
	updateVersion = function (versionChange, version, newName) {
		var newVersion = pkg.version.split('-').shift().split('.');

		switch (versionChange) {
			case 'major':
				newVersion[0]++;
				newVersion[1] = 0;
				newVersion[2] = 0;
				break;
			case 'minor':
				newVersion[1]++;
				newVersion[2] = 0;
				break;
			case 'patch':
			default:
				newVersion[2]++;
				break;
		}

		return newVersion.join('.') + '-' + newName;
	},
	versionChange = process.argv[2],
	newVersionName = generate(lists.prefixes, lists.animals).toLowerCase();

pkg.version = updateVersion(versionChange, pkg.version, newVersionName);

console.log(JSON.stringify(pkg, null, 2));

console.log('>>', process.argv);
/*
fs.writeFile('./package.json', JSON.stringify(pkg, null, 2), function (err) {
	if (err) {
		return console.log(err);
	}
});
*/