import { model, Schema, Types, Document } from 'mongoose'

export type IUser = Document & {
  fullname: string;
  nickname: string;
  password: string;
  email: string;
  isActive: boolean;
}

const schema: Schema<IUser> = new Schema({
  fullname: { type: String, required: true, trim: true },
  nickname: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  email: {  type: String, required: true, trim: true, unique: true },
  isActive: { type: Boolean, default: false }
}, { versionKey: false, timestamps: true })

export const UserModel = model('User', schema)