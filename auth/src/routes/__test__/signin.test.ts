import request from 'supertest';
import { app } from '../../app';

const signinRoute = '/api/users/signin';
const signupRoute = '/api/users/signup';

describe('POST /api/users/signin', () => {
  const validPayload = {
    email: 'test@test.com',
    password: 'password',
  };

  beforeEach(async () => {
    await request(app)
      .post(signupRoute)
      .send(validPayload)
      .expect(201);
  });

  it('should respond with a cookie when given valid credentials', async () => {
    const response = await request(app)
      .post(signinRoute)
      .send(validPayload)
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('should fail if an incorrect password is supplied', async () => {
    await request(app)
      .post(signinRoute)
      .send({
        ...validPayload,
        password: 'asdfasdf',
      })
      .expect(400);
  });

  it('should fail if the email does not exist', async () => {
    await request(app)
      .post(signinRoute)
      .send({
        ...validPayload,
        email: 'test2@gmail.com',
      })
  })
});
