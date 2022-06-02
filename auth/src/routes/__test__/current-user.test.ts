import request from 'supertest';
import { app } from '../../app';

const currentUserRoute = '/api/users/currentUser';

describe('GET /api/users/current-user', () => {
  describe('When using current-user route', () => {
    it('should responds with details about the current user', async () => {
      const cookie = await signin();

      const response = await request(app)
        .get(currentUserRoute)
        .set('Cookie', cookie) // we need to set the cookie session manually
        .send()
        .expect(200);

      expect(response.body.currentUser.email).toEqual('test@test.com');
    });

    it('should respond null if not authenticated', async () => {
      const response = await request(app)
        .get(currentUserRoute)
        .expect(200)

      expect(response.body.currentUser).toBeNull()
    })
  });
});
