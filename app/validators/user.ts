import vine from '@vinejs/vine'

/**
 * Shared rules for email and password. Emails are compared trimmed and in
 * lower case (as `users:create` stores them). Passwords up to 128
 * characters, so long passphrases from a password manager fit.
 */
const email = () => vine.string().trim().toLowerCase().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(128)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().trim().maxLength(120).nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string().maxLength(128),
})
