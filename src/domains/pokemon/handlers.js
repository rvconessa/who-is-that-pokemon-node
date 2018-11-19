const Axios = require('axios');
const crypto = require('crypto');
const jimp = require('jimp');

const { apiRoutes } = require('../../config')
const { encrypt, decrypt  } = require('../../ultils/crypto')

const _getRandomNumber = () => {
    return Math.floor(Math.random() * 803) + 1 ;
}

const _createImageBase64 = async (url) => {
    const image = await jimp.read(url);
    await image.color([{ apply: 'darken', params: [100] }]).resize(220, jimp.AUTO)
    const convert64 = image.getBase64Async(jimp.AUTO)

    return convert64;
}

const _responseFormat = async (data) => {
    return [{
        name: data.name,
        encryptName: encrypt(data.name),
        pokemonImage: await _createImageBase64(`${apiRoutes.sprites}/${data.id}.png`),
    }]
}
const checkPokemon = (context) => {
    const data = context.request.body;
    console.log(encrypt(data.name));
    console.log(decrypt(data.encryptName));
    if(data.name === decrypt(data.encryptName)) {
        return context.ok({success: true})
    }

    return context.notFound();
}

const pokemons = 
    Axios.get(`${apiRoutes.pokemon}/${_getRandomNumber()}`)
        .then((response) => _responseFormat(response.data))
        .catch((error) => error)

const getPokemonRandom = (context) =>
        pokemons
          .then(context.ok);        

module.exports = {
    getPokemon: getPokemonRandom,
    checkPokemon
};