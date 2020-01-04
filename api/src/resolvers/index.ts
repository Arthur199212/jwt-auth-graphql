import { User } from '../models'
import { registerSchema } from '../validation'

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
    }
  }
}

export default resolver
