import { Input } from '@/components/ui/Input/Input';
import s from './styles.module.scss';
import { Button } from '@/components/ui/Button/Button';
import { FC } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProjectSchema } from '@/components/Sidebar/components/AddProjectModal/validationSchema';
import { useProjectsStore } from '@/store/ProjectsStore';

interface AddProjectModalProps {
  onClose: VoidFunction;
}

export const AddProjectModal: FC<AddProjectModalProps> = ({ onClose }) => {
  const addProject = useProjectsStore((state) => state.addProject);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: 'onSubmit',
    resolver: yupResolver(createProjectSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ title }) => {
    addProject(title);
    onClose();
  };

  console.log(errors);

  return (
    <form
      className={s.addProject}
      onSubmit={handleSubmit(onSubmit)}
      noValidate={true}
    >
      <span className={s.title}>New project</span>
      <Input
        name="title"
        label="Title"
        register={register}
        isError={!!errors['title']}
      />
      <Button kind="primary">Create</Button>
    </form>
  );
};
