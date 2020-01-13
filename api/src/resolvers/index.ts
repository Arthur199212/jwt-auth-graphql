import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { User } from '../models'
import { registerSchema } from '../validation'
import * as Auth from '../auth'

interface Context {
  req: Request,
  res: Response
}

const resolver = {
  Query: {
    users: async (parent: any, args: any, { req }: Context, info: any) => {
      Auth.ensureSignedIn(req)

      return await User.find({})
    }
  },
  Mutation: {
    register: async (parent: any, args: any, ctx: Context, info: any) => {
      await registerSchema.validateAsync(args, { abortEarly: false })

      const { email, password } = args

      const find = await User.exists({ email })

      if (find) throw new Error('Invalid email')

      const user = await User.create({
        email, password
      })

      return user
    },
    login: async ( parent: any, args: any, { res }: Context, info: any) => {
      // TODO ensureSignedOut()

      const { email, password } = args

      const user = await User.findOne({ email })

      if (!user) throw new Error('Invalid email')

      const isValid = await compare(password, user.password)

      if (!isValid) throw new Error('Invalid password')

      Auth.sendRefreshToken(res, user.id)

      return {
        accessToken: Auth.createAccessToken(user.id)
      }
    },
    logout: (parent: any, args: any, { res }: Context, info: any) => {
      Auth.resetRefreshToken(res)

      return true
    }
  }
}

export default resolver
