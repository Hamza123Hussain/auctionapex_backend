import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Model/User.js'
import { Auth } from '../../../FireBaseConfig.js'

export const Signin = async (req, res) => {
  const { username, email, password } = req.body // Ensure password is extracted
  const image = req.file ? req.file.path : null // Get the image path

  if (!password) {
    // Check if password is provided
    return res.status(400).json({ error: 'Password is required' })
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
      email,
      password
    )

    if (userCredential.user.uid) {
      const newUser = new User({
        _id: userCredential.user.uid,
        username,
        email,
        password,
        image,
      })

      await newUser.save()
      res.status(201).json(true)
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
