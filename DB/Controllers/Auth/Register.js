import { User } from '../../Model/User.js'
export const Signin = async (req, res) => {
  const { username, email, password } = req.body
  const image = req.file ? req.file.path : null // Get the image path
  try {
    const newuser = User({ username, email, password, image })
    await newuser.save()
    res.status(201).json({ username, email, image })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
