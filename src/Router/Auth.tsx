type Props = {
  children?: JSX.Element;
  auth: string;
};

function Auth({ children, auth }: Props) {
  return <>{children}</>;
}

export type { Props as AuthProps };
export default Auth;
