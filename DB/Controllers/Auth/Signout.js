import { signOut } from 'firebase/auth'
import { Auth } from '../../../FireBaseConfig.js'

export const Signout = async (req, res) => {
  try {
    await signOut(Auth)
    res.status(200).json(true)
  } catch (error) {
    console.error('Error during signout:', error)
    res.status(500).send('Error during signout')
  }
}
