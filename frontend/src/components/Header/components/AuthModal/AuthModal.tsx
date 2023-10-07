import { Button } from '@/components/ui/Button/Button';
import { signIn } from 'next-auth/react';

export const AuthModal = () => {
  const onSubmit = async () => {
    await signIn('google');
  };

  return (
    <div style={{ backgroundColor: 'red' }}>
      <Button kind="primary" onClick={onSubmit}>
        Sign In with Google
      </Button>
    </div>
  );
};
