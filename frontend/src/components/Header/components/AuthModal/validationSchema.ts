import * as yup from 'yup';
import { ValidationMessages } from '@/constants/validationMessages';

export const signUpSchema = yup
  .object({
    name: yup.string().required(ValidationMessages.REQUIRED),
    email: yup
      .string()
      .email(ValidationMessages.EMAIL)
      .required(ValidationMessages.REQUIRED),
    password: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .required(ValidationMessages.REQUIRED),
    confirmPassword: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .oneOf([yup.ref('password')], ValidationMessages.EQUALS_PASSWORDS)
      .required(ValidationMessages.REQUIRED),
  })
  .required();

export const signInSchema = yup
  .object({
    username: yup.string().required(ValidationMessages.REQUIRED),
    password: yup
      .string()
      .min(6, ValidationMessages.MIN_PASSWORD)
      .required(ValidationMessages.REQUIRED),
  })
  .required();
