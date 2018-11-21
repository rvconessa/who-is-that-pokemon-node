
const request = require('supertest');

describe('Domains/Home/Routes', () => {
    describe('Welcome Message', () => {
        const api = require('../../api');
      it('should message "Who is that pokemon?"', async () => {
        const server = await api({ port: null });

        const { body, status } = await request(server).get('/');
    
        expect(status).toBe(200);
        expect(body).toHaveProperty('message');
        expect(body.message).toEqual("Who is that pokemon?");
      });
    });
  })