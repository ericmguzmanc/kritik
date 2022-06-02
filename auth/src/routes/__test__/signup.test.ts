import request from 'supertest';
import { app } from '../../app';

const signupUrl = '/api/users/signup';

describe('POST /api/users/signup', () => {
  it('should send a cookie after successful signup', async () => {
    const response = await request(app)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('should return 400 if the email is invalid', async () => {
    await request(app)
      .post(signupUrl)
      .send({
        emai: 'test',
        password: 'password',
      })
      .expect(400);
  });

  it('should return 400 if the password is invalid', async () => {
    await request(app)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        password: 'as',
      })
      .expect(400);
  });

  it('should return 400 if missing email or password', async () => {
    await request(app)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
      })
      .expect(400);

    await request(app)
      .post(signupUrl)
      .send({
        password: 'password',
      })
      .expect(400);
  });

  it('should return 400 if it is a duplicate email', async () => {
    await request(app)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post(signupUrl)
      .send({
        email: 'test@test.com',
        password: 'asdfasdf',
      })
      .expect(400);
  });
});
