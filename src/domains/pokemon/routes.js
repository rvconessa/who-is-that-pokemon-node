const Router = require('koa-joi-router');
const Handlers = require('./handlers');

const router = Router();
router.name = 'Pokemons';
router.prefix('/pokemon');

router.get('/', {
    description: 'Sorteia um Pokemon',
    tags: ['api'],
    handler: async (ctx) => {
        const pokemon = await Handlers.getPokemon;
        ctx.status = 200;
        ctx.body = {pokemon};
    }
});

router.post('/', {
    description: 'Checa um Pokemon',
    handler: Handlers.checkPokemon
});

module.exports = router.middleware();