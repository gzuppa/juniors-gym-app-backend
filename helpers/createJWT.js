import jwt from 'jsonwebtoken'

const createJWT = id => {
  return jwt.sign({ id }, 'secretword', {
    expiresIn: '10d',
  })
}

export default createJWT
