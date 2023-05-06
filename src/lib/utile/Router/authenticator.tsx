import type { ReactNode } from 'react';
import type { Auth } from './types';

type Props = {
  auth: Auth;
  pageAuth: Auth | ReadonlyArray<Auth>;
  wrongAccessPage: ReactNode;
  page: ReactNode;
};

function authenticator({
  auth,
  pageAuth,
  page,
  wrongAccessPage,
}: Props): [ReactNode, 0 | 1] {
  if (Array.isArray(pageAuth)) {
    for (let i = 0; i < pageAuth.length; i++) {
      if (pageAuth[i] === auth) {
        return [page, 1];
      }
    }
    return [wrongAccessPage, 0];
  }

  if (pageAuth !== 'common' && auth !== pageAuth) {
    return [wrongAccessPage, 0];
  }

  return [page, 1];
}

// export type { Props as AuthenticatorParams };
export default authenticator;
