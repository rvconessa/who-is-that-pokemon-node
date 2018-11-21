
const request = require('supertest');
const isBase64 = require('is-base64');

expect.extend({
    async equal64(str) {
        if (isBase64(str, {mime: true})) {
            return {
                message: () =>
                "expected base64 image",
                pass: true,
            };
        } else {
            return {
                message: () =>
                "expected base64 image",
                pass: false,
            };
        }
    },
});
describe('Domains/Pokemon/Handlers', () => {
    describe('getRandomPokemon', () => {
        const api = require('../../api');
      it('should pokemon name encrypt and Image64', async () => {
        const server = await api({ port: null });

        const { body, status } = await request(server).get('/pokemon');
    
        expect(status).toBe(200);
        expect(body[0]).toHaveProperty('encryptName');
        expect(body[0]).toHaveProperty('pokemonImage');
        expect(body[0].pokemonImage).equal64();
      });
    });
  })