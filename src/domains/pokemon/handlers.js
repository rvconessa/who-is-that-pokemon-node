const Axios = require('axios');
const crypto = require('crypto');
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
   
const _decryptPokemonName = (text) =>{
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

const getPokemonRandom = 
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${_getRandomNumber()}`)
        .then((response) => _responseFormat(response.data))
        .catch((error) => console.log(error))


const _responseFormat = (data) => {
    return [{
        name: data.name,
        encryptName: _encryptPokemonName(data.name)
    }]
}

const checkPokemon = (context) => {
    const data = context.request.body;
    if(data.name === _decryptPokemonName(data.encryptName)) {3
        return context.ok({success: true})
    }

    return context.notFound();
}        

module.exports = {
    getPokemon: getPokemonRandom,
    checkPokemon
};