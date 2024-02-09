import User from '../models/User.js'
import createId from '../helpers/createId.js'
import createJWT from '../helpers/createJWT.js'
import { forgotPasswordMail, registerMail } from '../helpers/emails.js'

const registerUser = async (req, res) => {
  const { email } = req.body
  const isUserExists = await User.findOne({ email: email })

  if (isUserExists) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    user.token = createId()
    await user.save()
    registerMail({
      email: user.email,
      name: user.name,
      token: user.token,
    })
    res.json({
      msg: 'Usuario creado correctamente, revisa tu mail para confirmar tu cuenta',
    })
  } catch (error) {
    console.log(error)
  }
}

const authenticate = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(403).json({ msg: error.message })
  }

  if (!user.confirmed) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({ msg: error.message })
  }

  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id),
    })
  } else {
    const error = new Error('Tu password es incorrecto')
    return res.status(403).json({ msg: error.message })
  }
}

const confirm = async (req, res) => {
  const { token } = req.params
  const confirmUser = await User.findOne({ token })

  if (!confirmUser) {
    const error = new Error('Token no válido')
    return res.status(403).json({ msg: error.message })
  }

  try {
    confirmUser.confirmed = true
    confirmUser.token = ''
    await confirmUser.save()
    res.json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = createId()
    await user.save()

    forgotPasswordMail({
      email: user.email,
      name: user.name,
      token: user.token,
    })

    res.json({
      msg: 'Hemos enviado un mail con las instrucciones para el reestablecimiento de tu password',
    })
  } catch (error) {
    console.log(error)
  }
}

const confirmToken = async (req, res) => {
  const { token } = req.params
  const validToken = await User.findOne({ token })

  if (validToken) {
    res.json({ msg: 'Token valido, usuario existente' })
  } else {
    const error = new Error('Token no válido')
    return res.status(404).json({ msg: error.message })
  }
}

const newPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const user = await User.findOne({ token })

  if (user) {
    user.password = password
    user.token = ''
    try {
      await user.save()
      res.json({ msg: 'Password actualizado correctamente' })
    } catch (error) {
      console.log(error)
    }
  } else {
    const error = new Error('Token no válido')
    return res.status(404).json({ msg: error.message })
  }
}

const profile = async (req, res) => {
  const { user } = req
  res.json(user)
}

export {
  authenticate,
  confirm,
  confirmToken,
  forgotPassword,
  newPassword,
  profile,
  registerUser,
}
