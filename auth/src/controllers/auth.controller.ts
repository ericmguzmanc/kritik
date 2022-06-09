import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { PasswordHasher } from '../util/PasswordHasher';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ name, email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid Credentials');
  }

  const passwordsMatch = await PasswordHasher.compare(
    existingUser.password,
    password
  );

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};

const signOut = async (req: Request, res: Response) => {
  req.session = null;
  res.send({});
}

const getCurrentUser = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
}
export { signUp, signIn, signOut, getCurrentUser };
