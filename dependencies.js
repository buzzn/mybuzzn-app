const fs = require('fs');
const packageJSON = require('./package.json');


const allJSONs = Object.keys(packageJSON.dependencies).map((dep) => require(dep + '/package.json') );
const dataWeNeed = allJSONs.map((j) => ({
    name: j.name,
    version: j.version,
    license: j.license || null,
    author: j.author ? j.author.name : null,
    homepage: j.homepage || null,
    licenseContent: fs.existsSync('./node_modules/' + j.name + '/LICENSE') ? fs.readFileSync('./node_modules/' + j.name + '/LICENSE', { encoding: 'utf8' }) : null
}));

fs.writeFileSync('./dependencies.json', JSON.stringify(dataWeNeed));