import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import {
  QUARTER_HOUR,
  SEVEN_DAYS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} from './config'

export const ensureSignedIn = (req: Request) => {
  const { authorization } = req.headers

  if (!authorization) throw new Error('Authorization Error')

  const token = authorization.split(' ')[1]

  verify(token, ACCESS_TOKEN_SECRET)
}

export const createAccessToken = (userId: string) => {
  return sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: QUARTER_HOUR })
}

export const createRefreshToken = (userId: string) => {
  return sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: SEVEN_DAYS })
}

export const sendRefreshToken = (res: Response, userId: string) =>
  res.cookie('token', createRefreshToken(userId), { httpOnly: true })

export const resetRefreshToken = (res: Response) =>
  res.cookie('token', '', { httpOnly: true })

export const verifyRefreshToken = (req: Request, res: Response) => {
  const { token } = req.cookies

  if (!token) throw new Error('Token not found')

  let payload: any = { userId: '' }

  try {
    payload = verify(token, REFRESH_TOKEN_SECRET)
  } catch (err) {
    throw new Error('Invalid token')
  }

  return payload
}
