import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { User } from '../models'
import { registerSchema } from '../validation'
import { createAccessToken, createRefreshToken } from '../auth'

const resolver = {
  Query: {
    users: async (parent: any, args: any, ctx: any, info: any) => {
      // TODO check if logged in
      // isLogedIn()

      return await User.find({})
    }
  },
  Mutation: {
    register: async (parent: any, args: any, ctx: any, info: any) => {
      await registerSchema.validateAsync(args, { abortEarly: false })

      const { email, password } = args

      const find = await User.exists({ email })

      if (find) throw new Error('Invalid email')

      const user = await User.create({
        email, password
      })

      return user
    },
    login: async (
        parent: any,
        args: any,
        { res }: { req: Request, res: Response },
        info: any
      ) => {
      const { email, password } = args

      const user = await User.findOne({ email })

      if (!user) throw new Error('Invalid email')

      const isValid = await compare(password, user.password)

      if (!isValid) throw new Error('Invalid password')

      res.cookie('token', createRefreshToken(user.id), { httpOnly: true })

      return {
        accesToken: createAccessToken(user.id)
      }
    }
  }
}

export default resolver
