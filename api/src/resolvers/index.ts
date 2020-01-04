import { User } from '../models'

const resolver = {
  Query: {
    hello: () => 'Hello man!'
  },
  Mutation: {
    register: async (parent: any, args: any, ctx: any, info: any) => {
      // TODO validation, hashing password
      const { email, password } = args

      const user = await User.create({
        email, password
      })

      return user
    }
  }
}

export default resolver
