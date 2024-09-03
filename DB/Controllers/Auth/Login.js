import { generateToken } from '../../../JsonWebToken.js'
import { User } from '../../Model/User.js'
import bcrypt from 'bcrypt'

export const Login = async (req, res) => {
  const { email, password } = req.body

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    // Find the user by email
    const findUser = await User.findOne({ email })

    if (!findUser) {
      return res.status(404).json({ message: 'User does not exist' })
    }

    // Compare provided password with stored hashed password
    const matchPassword = await bcrypt.compare(password, findUser.password)

    if (!matchPassword) {
      return res.status(400).json({ message: 'Password does not match' })
    }

    // Generate JWT token
    const token = generateToken(findUser._id)

    // Respond with token and user data
    res.status(200).json({
      token,
      user: {
        id: findUser._id,
        name: findUser.username,
        email: findUser.email,
        image: findUser.image,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
