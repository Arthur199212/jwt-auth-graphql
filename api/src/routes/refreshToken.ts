import { Router, Request, Response } from 'express'
import { User } from '../models'
import * as Auth from '../auth'

const router = Router()

router.post('/refresh_token', async (req: Request, res: Response) => {
  // TODO implement forgot the password
  // TODO add white list/black list of tokens or just add token version

  try {
    const payload = Auth.verifyRefreshToken(req, res)

    const user = await User.findById(payload.userId)

    if (!user) throw new Error('Invalid token data')

    Auth.sendRefreshToken(res, user.id)

    res.json({
      refresh: true,
      accessToken: Auth.createAccessToken(user.id)
    })
  } catch (err) {
    console.log('Error:', err.message)
    return res.status(400).json({
      refresh: false,
      accessToken: ''
    })
  }
})

export default router
