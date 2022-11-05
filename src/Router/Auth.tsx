import { Route } from 'react-router-dom';

type Props = {
  children?: JSX.Element;
  auth: string;
};

function Auth({ children, auth }: Props) {
  return <Route path='test1' element={children} />;
}

export type { Props as AuthProps };
export default Auth;
