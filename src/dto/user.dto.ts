import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  fullname: yup.string().required(),
  nickname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
})