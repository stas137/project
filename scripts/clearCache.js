const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, '..', 'node_modules', '.cache');

fs.rmSync(filePath, { recursive: true, force: true });
