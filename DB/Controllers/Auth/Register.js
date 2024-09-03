import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '../../Model/User.js'
import { Auth } from '../../../FireBaseConfig.js'

export const Signin = async (req, res) => {
  const { username, email, password } = req.body // Extract required fields
  const image = req.file ? req.file.path : null // Get the image path

  if (!password) {
    // Ensure password is provided
    return res.status(400).json({ error: 'Password is required' })
  }

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      Auth,
      email,
      password
    )

    // Check if Firebase user ID exists
    if (userCredential.user.uid) {
      // Create a new MongoDB user document with Firebase user ID
      const newUser = new User({
        _id: userCredential.user.uid, // Use Firebase user ID as MongoDB user ID
        username,
        email,
        password, // Optionally, you may want to store a hashed version of the password instead
        image,
      })

      // Save the user document to MongoDB
      await newUser.save()

      // Respond with success
      res.status(201).json({ username, email, image })
    }
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message })
  }
}
