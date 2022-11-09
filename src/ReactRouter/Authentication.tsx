type Props = {
  auth: string;
  componentAuth: string;
  wrongAccessElement: JSX.Element;
  element: JSX.Element;
};

function Authentication({
  auth,
  componentAuth,
  element,
  wrongAccessElement,
}: Props) {
  if (componentAuth !== 'common' && auth !== componentAuth) {
    return wrongAccessElement;
  }

  return element;
}

export default Authentication;
