import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { ValidationMessages } from '@/constants/validationMessages';
import { FieldValues } from 'react-hook-form';

export const createProjectSchema: ObjectSchema<FieldValues> = yup
  .object()
  .shape({
    title: yup.string().required(ValidationMessages.REQUIRED),
  })
  .required();
