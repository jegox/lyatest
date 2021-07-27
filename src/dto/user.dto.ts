import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  fullname: yup.string().required(),
  nickname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const updateSchema = yup.object().shape({
  fullname: yup.string().required(),
  nickname: yup.string().required(),
  email: yup.string().email().required()
})

export const idSchema = yup.string()