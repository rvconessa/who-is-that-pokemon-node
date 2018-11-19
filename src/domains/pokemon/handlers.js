const Axios = require('axios');
const crypto = require('crypto');
const jimp = require('jimp');
const algorithm = 'aes-256-ctr';
const password = 'renan-pokemon-api-@321';

const _getRandomNumber = () => {
    return Math.floor(Math.random() * 803) + 1 ;
}

const _encryptPokemonName = (text) => {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
   
const _decryptPokemonName = (text) => {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
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
        encryptName: _encryptPokemonName(data.name),
        pokemonImage: await _createImageBase64(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`),
    }]
}

const checkPokemon = (context) => {
    const data = context.request.body;
    if(data.name === _decryptPokemonName(data.encryptName)) {3
        return context.ok({success: true})
    }

    return context.notFound();
}

const getPokemonRandom = 
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${_getRandomNumber()}`)
        .then((response) => _responseFormat(response.data))
        .catch((error) => error)


module.exports = {
    getPokemon: getPokemonRandom,
    checkPokemon
};