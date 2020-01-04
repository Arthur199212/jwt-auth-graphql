import { User } from '../models'
import { registerSchema } from '../validation'
import { compare } from 'bcryptjs'

const resolver = {
  Query: {
    users: async () => await User.find({})
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
    login: async (parent: any, args: any, ctx: any, info: any) => {
      const { email, password } = args

      const user = await User.findOne({ email })

      if (!user) throw new Error('Invalid login')

      const isValid = await compare(password, user.password)

      if (!isValid) throw new Error('Invalid password')

      return user
    }
  }
}

export default resolver
