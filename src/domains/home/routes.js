const Router = require('koa-joi-router');

const router = Router();
router.name = 'Home';
router.prefix('/');

router.get('/', {
    description: 'Who is that pokemon?',
    tags: ['api'],
    handler: async (ctx) => {
        ctx.status = 200;
        ctx.body = { message: "Who is that pokemon?" };
    }
});

module.exports = router.middleware();