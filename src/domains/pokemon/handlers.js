const Axios = require('axios');

const { apiRoutes } = require('../../config')
const { encrypt, decrypt  } = require('../../ultils/crypto')
const { createResizeImageBase64, createBlackImageBase64 } = require('../../ultils/images')

const _getRandomNumber = () => {
    return Math.floor(Math.random() * 949) + 1;
}

const _responseFormat = async (data) => {
    return [{
        name: data.name,
        encryptName: encrypt(data.name),
        pokemonImage: await createBlackImageBase64(`${apiRoutes.sprites}/${data.id}.png`),
    }]
}

const _responseFormatCorrect = async (data) => {
    return [{
        name: data.name,
        pokemonImage: await createResizeImageBase64(`${apiRoutes.sprites}/${data.id}.png`)
    }]
}
const checkPokemon = async (context) => {
    const data = context.request.body;
    if(data.name === decrypt(data.encryptName)) {
        let response = await pokemons(data.name)
        return context.ok(await _responseFormatCorrect(response))
    }

    return context.notFound()
}
const pokemons = (data) => {
    let filter = data ? data : _getRandomNumber();
    return Axios.get(`${apiRoutes.pokemon}/${filter}`)
        .then((response) => response.data)
        .catch((error) => error)
} 
    
const getPokemonRandom = async (context) => {
    let response = await pokemons();
    context.ok(await _responseFormat(response))
}
     
module.exports = {
    getPokemon: getPokemonRandom,
    checkPokemon
};