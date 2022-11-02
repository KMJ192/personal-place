import { Route } from 'react-router-dom';

type Props = {
  children?: JSX.Element;
  path: string;
};

function Page({ path, children }: Props) {
  return <Route path={path} element={<>{children}</>} />;
}

export type { Props as PageProps };
export default Page;
