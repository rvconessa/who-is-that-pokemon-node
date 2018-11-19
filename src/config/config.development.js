module.exports = {
    api: {
      port: 3000,
    },
    apiRoutes: {
      pokemon: 'https://pokeapi.co/api/v2/pokemon',
      sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
    },
    encryptionConfig: {
        algorithm: 'aes-256-ctr',
        hash: 'renan-pokemon-teste'
    }
  }