const jimp = require('jimp');

const createResizeImageBase64 = async (url) => {
    let image = await jimp.read(url);
    await image.resize(180, jimp.AUTO)
    let convert64 = image.getBase64Async(jimp.AUTO)

    return convert64;
}

const createBlackImageBase64 = async (url) => {
    let image = await jimp.read(url);
    await image.color([{ apply: 'darken', params: [100] }]).resize(180, jimp.AUTO)
    let convert64 = image.getBase64Async(jimp.AUTO)

    return convert64;
}

module.exports = { createResizeImageBase64, createBlackImageBase64 };