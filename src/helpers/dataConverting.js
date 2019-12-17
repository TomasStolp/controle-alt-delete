
const csv=require('csvtojson')

async function jsonArray (path, id) {
    const data =  await csv().fromFile(path);

    return id ? data[id] : data;
};

module.exports = jsonArray;


