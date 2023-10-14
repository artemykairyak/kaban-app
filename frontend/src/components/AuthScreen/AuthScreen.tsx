import GoogleIcon from '@/images/google.svg';
import { signIn } from 'next-auth/react';
import s from './styles.module.scss';
import { Button } from '@/components/ui/Button/Button';

export const AuthScreen = () => {
  return (
    <div className={s.content}>
      <h1 className={s.title}>Sign In</h1>
      <Button
        kind="secondary"
        onClick={() => signIn('google')}
        className={s.btn}
      >
        <img src={GoogleIcon.src} alt="Google Logo" className={s.icon} />
        Sign In with Google
      </Button>
    </div>
  );
};
