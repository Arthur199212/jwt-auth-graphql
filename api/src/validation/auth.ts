import Joi from '@hapi/joi'
import { BCRYPT_MAX_BYTES } from '../config/auth'

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(8)
    .max(254)
    .lowercase()
    .trim()
    .required(),

  password: Joi.string()
    .min(8)
    .max(BCRYPT_MAX_BYTES, 'utf8')
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required(),
})
