import { signInWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Model/User.js'
import bcrypt from 'bcrypt'
import { Auth } from '../../../FireBaseConfig.js'
import { generateToken } from '../../../JsonWebToken.js'

export const Login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      Auth,
      email,
      password
    )
    if (userCredential) {
      const findUser = await User.findOne({ email })
      if (!findUser) {
        return res.status(404).json({ message: 'User does not exist' })
      }

      const matchPassword = await bcrypt.compare(password, findUser.password)
      if (!matchPassword) {
        return res.status(400).json({ message: 'Password does not match' })
      }

      const token = generateToken(findUser._id)
      res.status(200).json({
        token,
        user: {
          id: findUser._id,
          name: findUser.username,
          email: findUser.email,
          image: findUser.image,
        },
      })
    }
  } catch (error) {
    console.error('Login error:', error) // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
