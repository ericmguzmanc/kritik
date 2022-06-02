import { body } from 'express-validator';

export function signInValidator() {
  return [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage('You must supply a password'),
  ];
}
