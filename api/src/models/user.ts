import { Schema, model, Document } from 'mongoose'
import { hash } from 'bcryptjs'
import { BCRYPT_WORK_FACTOR } from '../config'

interface UserDocument extends Document {
  email: string,
  password: string,
}

const userSchema = new Schema({
  email: String,
  password: String
}, {
  timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
  }
})

export const User = model<UserDocument>('User', userSchema)
