const {copy} = require('fs-extra');
const {resolve} = require('path');

require('dotenv').config();

const source = resolve('./build/static');
const destination = process.env.BUILD_DEST_PATH;

copy(source, destination, { overwrite: true })
    .then(() => console.log("\x1b[32m%s\x1b[0m", 'Copied to achievements build folder.'))
    .catch((err) => console.error(err));