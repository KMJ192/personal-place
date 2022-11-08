type Props = {
  auth: string;
  componentAuth: string;
  wrongAccess: JSX.Element;
  component: JSX.Element;
};

function Authentication({
  auth,
  componentAuth,
  component,
  wrongAccess,
}: Props) {
  if (componentAuth !== 'common' && auth !== componentAuth) {
    return wrongAccess;
  }

  return component;
}

export default Authentication;
