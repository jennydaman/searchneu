/*
 * This file is part of Search NEU and licensed under AGPL3.
 * See the license file in the root folder for details.
 */

// This is a little helper file for files in the common folder that want to import macros.js
// and don't know if they need to import the backend macros.js or the frontend macros.js because they don't yet know where they are running
// This just require's the backend macros if running in the backend and requires the frontend macros if running in the frontend.


let toExport;
if (typeof window !== 'undefined') {
  toExport = require('../frontend/components/macros'); // eslint-disable-line global-require
} else {
  // This string must be mentioned in webpack's external config to avoid being bundled with the output js
  toExport = require('../backend/macros'); // eslint-disable-line dot-notation
}

export default toExport.default;
