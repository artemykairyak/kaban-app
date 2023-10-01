import * as yup from 'yup';
import { ValidationMessages } from '@/constants/validationMessages';

export const addTodoSchema = yup
  .object({
    title: yup.string().required(ValidationMessages.REQUIRED),
  })
  .required();
