import { useMutation } from '@tanstack/react-query';
import { METHOD, fetcher } from '@src/network/api/api';

type User = {
  email: string;
  password: string;
};

const KEY = ['@app/lab/jwt/hooks/useLogin'];

function useLogin() {
  const { mutateAsync } = useMutation(
    KEY,
    fetcher.MUT<User>({
      method: METHOD.POST,
      url: '/auth/login',
    }),
  );

  return {
    mutateAsync,
  };
}

export type { User };
export default useLogin;
