import { sign } from 'jsonwebtoken'
import {
  QUARTER_HOUR,
  SEVEN_DAYS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} from './config'

export const createAccessToken = (userId: string) => {
  return sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: QUARTER_HOUR })
}

export const createRefreshToken = (userId: string) => {
  return sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: SEVEN_DAYS })
}
