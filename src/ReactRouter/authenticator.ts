type AuthenticatorParams = {
  auth: string;
  pageAuth: string;
  wrongAccessPage: JSX.Element;
  page: JSX.Element;
};

function authenticator({
  auth,
  pageAuth,
  page,
  wrongAccessPage,
}: AuthenticatorParams): [JSX.Element, boolean] {
  if (pageAuth !== 'common' && auth !== pageAuth) {
    return [wrongAccessPage, true];
  }

  return [page, false];
}

export default authenticator;
