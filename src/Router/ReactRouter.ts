import Container from './Container';
import Auth from './Auth';
import Common from './Common';
import Page from './Page';
import NotFound from './NotFound';

type Props = {
  permission: Array<{
    auth: string;
  }>;
};

function ReactRouter({ permission }: Props) {
  return {
    Container,
    Auth,
    Common,
    Page,
    NotFound,
  };
}

export default ReactRouter;
