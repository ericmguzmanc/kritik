import express from 'express';
import { body } from 'express-validator';
import { currentUser } from '../middleware/current-user';
import { validateRequest } from '../middleware/validate-request';

import * as auth from '../controllers/auth.controller';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  auth.getCurrentUser
);

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  auth.signUp
);

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  auth.signIn
);

router.post('/api/users/signout', auth.signOut);

export { router as authRoutes };
