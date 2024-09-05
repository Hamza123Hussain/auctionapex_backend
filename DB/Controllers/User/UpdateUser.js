import { User } from '../../Model/User.js'
export const UpdateUser = async (req, res) => {
  try {
    const { userID, username } = req.body // Assuming the userID is passed in the request body
    // Ensure the userID and username are provided
    if (!userID || !username) {
      return res
        .status(400)
        .json({ message: 'User ID and username are required' })
    }
    // Find the user in the database
    const user = await User.findById(userID)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Update the username
    user.username = username
    // Check if a file was uploaded (image)
    if (req.file) {
      user.image = req.file.path // Update image path or URL
    }
    // Save the updated user
    await user.save()
    return res.status(200).json(true)
  } catch (error) {
    console.error('Error updating user:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
