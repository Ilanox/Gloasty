const fs = require('fs');
const path = require('path');

function importer(dirPath) {
    const absoluteDirPath = path.normalize(
        path.isAbsolute(dirPath)
            ? dirPath
            : path.resolve(process.cwd(), dirPath)
    );

    const output = {};

    const content = fs.readdirSync(path.normalize(absoluteDirPath));

    content.forEach((basename) => {
        const absoluteItemPath = path.join(absoluteDirPath, basename);

        if (fs.statSync(absoluteItemPath).isFile()) {
            output[basename.replace('.js','')] = require(absoluteItemPath);
        }
    });

    return output;
}

module.exports = {importer};