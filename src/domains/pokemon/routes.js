const Router = require('koa-joi-router');
const Handlers = require('./handlers');

const router = Router();
router.name = 'Pokemons';
router.prefix('/pokemon');

router.get('/', {
    description: 'Random Pokemon',
    tags: ['api'],
    handler: Handlers.getPokemon
});

router.post('/', {
    description: 'Check Pokemon',
    handler: Handlers.checkPokemon
});

module.exports = router.middleware();