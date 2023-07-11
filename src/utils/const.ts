export const REG_EXP_PASSWORD = /(?=.*[0-9])(?=.*[!@#$ %^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/gi;

export const MESSAGES = {
  loginError: 'Your login is less than 2 symbols',
  passwordError:
    'Your password does not match the required pattern: more than 6 symbols, one capital letter, one small letter, one number and one of !@#$%^&* symbols',
  findedUserError: 'There is a user in our database with your login name, please, choose another name',
} as const;

export const STATUSES_SHIP = {
  killed: 'killed',
  miss: 'miss',
  shot: 'shot',
} as const;

export const TYPES_SHIP = {
  medium: 'medium',
  large: 'large',
  huge: 'huge',
} as const;
