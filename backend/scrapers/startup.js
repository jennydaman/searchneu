/*
 * This file is part of Search NEU and licensed under AGPL3.
 * See the license file in the root folder for details.
 */

require('@babel/register');
require('@babel/polyfill');
const main = require('./main.js');

main.default.main();
