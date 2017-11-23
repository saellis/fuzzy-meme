export const regex = {
  username: {
    regex: /^[a-zA-Z0-9@.]{7,}$/,
    failureText: 'Username must be 7 characters'
  },
  password: {
    full: {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      failureText: 'Password must have digit, lower, and uppercase and 8 characters in length'
    },
    pieces: [
      {
          regex: /.{8,}/,
          failureText: 'Password must be 8 characters'
      },
      {
          regex: /(?=.*[A-Z])/,
          failureText: 'Password must have an uppercase letter'
      },
      {
          regex: /(?=.*[a-z])/,
          failureText: 'Password must have a lowercase letter'
      },
      {
          regex: /(?=.*\d)/,
          failureText: 'Password must have a digit'
      },
    ]
  }

}
