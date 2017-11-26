import {regex} from '../users.constants.js';

export const fieldConfig = [
  {
    ref: 'un',
    key: 'un',
    id: 'createUsername',
    type: 'createUsername',
    regex: regex.username.regex,
    placeholder: 'Username',
    label: 'Username: '
  },
  {
    ref: 'pw1',
    key: 'pw1',
    id: 'createPassword',
    type: 'createPassword',
    regex: regex.password.full.regex,
    placeholder: 'Password',
    label: 'Password: '
  },
  {
    ref: 'pw2',
    key: 'pw2',
    id: 'createConfirmPassword',
    type: 'createConfirmPassword',
    regex: regex.password.full.regex,
    placeholder: 'Confirm Password',
    label: 'Confirm Password: '
  }
]
